import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { runOnTransactionRollback, Transactional } from 'typeorm-transactional';
import { StorageService } from '../storage';
import { omit } from 'lodash';
import { ProductEntity } from './entities';
import { CategoriesService } from '../categories/services';
import { CreateProductDto, UpdateProductDto } from './dto';
import { OrderStatus } from '../orders/order.types';
import { CartEntity } from '../cart';
import { FilterOperator, PaginateConfig, PaginateQuery } from 'nestjs-paginate';
import { paginate } from '../common';

export const paginateConfig: PaginateConfig<ProductEntity> = {
  sortableColumns: ['id', 'name', 'price', 'sale', 'created', 'purchased'],
  defaultSortBy: [['id', 'DESC']],
  searchableColumns: ['name', 'id'],
  defaultLimit: 50,
  filterableColumns: {
    price: [FilterOperator.BTW],
  },
};

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepo: Repository<ProductEntity>,
    private categoriesService: CategoriesService,
    private storageService: StorageService,
  ) {}

  findOne(id: number) {
    return this.productsRepo
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.category', 'category')
      .leftJoinAndSelect('e.brand', 'brand')
      .leftJoinAndSelect('e.brand', 'brand')
      .leftJoinAndSelect('e.quantitySales', 'quantitySales')
      .leftJoinAndSelect('e.filters', 'filters')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(cart.uuid)', 'purchased')
          .from(CartEntity, 'cart')
          .leftJoin('cart.order', 'order')
          .where('cart.productID = e.id AND order.status IN(:...statuses)', {
            statuses: [
              OrderStatus.COMPLETED,
              OrderStatus.IN_DELIVERY,
              OrderStatus.PROCESSING,
            ],
          });
      }, 'purchased')
      .where('e.id = :id', { id })
      .getOneWithVirtualColumn();
  }

  async paginate(query: PaginateQuery) {
    const repo = this.productsRepo
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.category', 'category')
      .leftJoinAndSelect('category.parent', 'parentCategory')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(cart.uuid)', 'purchased')
          .from(CartEntity, 'cart')
          .leftJoin('cart.order', 'order')
          .where('cart.productID = e.id AND order.status IN(:...statuses)', {
            statuses: [
              OrderStatus.COMPLETED,
              OrderStatus.IN_DELIVERY,
              OrderStatus.PROCESSING,
            ],
          });
      }, 'purchased');

    return paginate(query, repo, paginateConfig);
  }

  @Transactional()
  async create(data: CreateProductDto) {
    const category = await this.categoriesService.findOne(data.categoryID);
    if (!category && data.categoryID)
      throw new NotFoundException('Category not found');

    const brand = await this.categoriesService.findOne(data.brandID);
    if (!brand && data.brandID) throw new NotFoundException('Brand not found');

    runOnTransactionRollback(() => {
      if (data.image) this.storageService.revert(data.image);
    });

    const product = this.productsRepo.create(data);
    const [image] = await this.storageService.commit([data.image]);
    product.image = image;

    return Object.assign(await this.productsRepo.save(product), {
      category,
      brand,
    });
  }

  @Transactional()
  async update(id: number, data: UpdateProductDto) {
    const category = await this.categoriesService.findOne(data.categoryID);
    if (!category && data.categoryID)
      throw new NotFoundException('Category not found');

    const brand = await this.categoriesService.findOne(data.brandID);
    if (!brand && data.brandID) throw new NotFoundException('Brand not found');

    const product = await this.productsRepo.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');

    runOnTransactionRollback(() => {
      if (data.image) this.storageService.revert(data.image);
    });

    const [image] = await this.storageService.commit(
      [data.image],
      [product.image],
    );
    product.image = image;

    const entity = Object.assign(product, omit(data, 'image'));
    await this.productsRepo.update({ id }, entity);
    return Object.assign(await this.productsRepo.save(product), {
      category,
      brand,
    });
  }

  @Transactional()
  async delete(id: number) {
    const product = await this.productsRepo.findOneBy({ id });
    if (!product) throw new NotFoundException();

    if (product.image) await this.storageService.delete([product.image]);

    const result = await this.productsRepo.delete({ id });
    return result.affected > 0;
  }
}

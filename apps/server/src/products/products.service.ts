import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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
import { AuditService } from '../audit/audit.service';
import { AuditType } from '../audit';

export const paginateConfig: PaginateConfig<ProductEntity> = {
  sortableColumns: [
    'id',
    'name',
    'price',
    'sale',
    'created',
    'purchased',
    'inStock',
  ],
  defaultSortBy: [['id', 'DESC']],
  searchableColumns: ['name', 'id'],
  defaultLimit: 50,
  filterableColumns: {
    price: [FilterOperator.BTW],
    inStock: true,
  },
};

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepo: Repository<ProductEntity>,
    private categoriesService: CategoriesService,
    private storageService: StorageService,
    private auditService: AuditService,
  ) {}

  findOne(id: number) {
    return this.productsRepo
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.category', 'category')
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
      .leftJoinAndSelect('e.brand', 'brand')
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

  async delete(id: number) {
    const product = await this.productsRepo.findOneBy({ id });
    if (!product) throw new NotFoundException();

    if (product.image) await this.storageService.delete([product.image]);

    const result = await this.productsRepo.delete({ id });
    return result.affected > 0;
  }

  @Transactional()
  async inStockIncrement(id: number, quantity: number) {
    const product = await this.productsRepo.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');

    await this.productsRepo.increment({ id }, 'inStock', quantity);
    await this.auditService.create(AuditType.PRODUCT_STOCK_INCREMENT, product, {
      oldStock: product.inStock,
      newStock: product.inStock + quantity,
    });

    return Object.assign(product, { inStock: product.inStock + quantity });
  }

  async inStockDecrement(id: number, quantity: number) {
    const product = await this.productsRepo.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');

    if (product.inStock < quantity) {
      throw new Error('Not enough stock to decrement');
    }
    await this.productsRepo.decrement({ id }, 'inStock', quantity);

    return Object.assign(product, { inStock: product.inStock - quantity });
  }

  async inStockIncrementBulk(
    idsQuantities: { id: number; quantity: number }[],
  ) {
    const productIds = idsQuantities.map((item) => item.id);
    const products = await this.productsRepo.findBy({ id: In(productIds) });

    const incrementOperations = idsQuantities.map(async ({ id, quantity }) => {
      const product = products.find((p) => p.id === id);

      if (product) {
        await this.productsRepo.increment({ id }, 'inStock', quantity);
        return { ...product, inStock: product.inStock + quantity };
      }
    });

    const results = await Promise.all(incrementOperations);
    return results.filter(Boolean);
  }

  async inStockDecrementBulk(
    idsQuantities: { id: number; quantity: number }[],
  ) {
    const productIds = idsQuantities.map((item) => item.id);
    const products = await this.productsRepo.findByIds(productIds);

    const decrementOperations = idsQuantities.map(async ({ id, quantity }) => {
      const product = products.find((p) => p.id === id);

      if (product && product.inStock >= quantity) {
        await this.productsRepo.decrement({ id }, 'inStock', quantity);
        return { ...product, inStock: product.inStock - quantity };
      }
    });

    const results = await Promise.all(decrementOperations);
    return results.filter(Boolean); // Filter out undefined results
  }
}

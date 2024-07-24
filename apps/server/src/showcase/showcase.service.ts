import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CursorPaginatedConfig,
  CursorPaginateQuery,
  cursorPaginate,
} from '../common';
import { FilterOperator } from 'nestjs-paginate';
import {
  ProductStockChangeDetailsDto,
  ShowcaseRequestDto,
} from './showcase.dto';
import { ProductsService } from '../products/products.service';
import { InventoryEntity, ShowcaseEntity } from './entities';
import { ShowcaseOperation } from './showcase.types';
import { UserEntity } from '../users';
import { Transactional } from 'typeorm-transactional';
import { CartEntity } from '../cart';

export const cursorPaginateConfig: CursorPaginatedConfig<ShowcaseEntity> = {
  cursorColumns: ['id', 'created'],
  defaultCursorColumn: 'id',
  sortableColumns: ['id', 'created'],
  defaultSortBy: [['id', 'DESC']],
  filterableColumns: {
    status: [FilterOperator.EQ, FilterOperator.IN],
    created: [FilterOperator.BTW],
  },
  searchableColumns: ['id'],
  defaultLimit: 20,
};

@Injectable()
export class ShowcaseService {
  constructor(
    @InjectRepository(ShowcaseEntity)
    private readonly showcaseRepository: Repository<ShowcaseEntity>,
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService,
  ) {}

  @Transactional()
  async create(dto: ShowcaseRequestDto, user: UserEntity) {
    switch (dto.type) {
      case ShowcaseOperation.StockAcquisition:
        return this.handleStockIncrement(dto, user);
      case ShowcaseOperation.OrderPurchase:
        return this.handlePurchaseOrRefund(dto);
      case ShowcaseOperation.OrderRefund:
        return this.handlePurchaseOrRefund(dto);
      case ShowcaseOperation.StockReceipt:
        return this.handleStockIncrement(dto, user);
      case ShowcaseOperation.StockWriteOff:
        return this.handleStockDecrement(dto, user);
      case ShowcaseOperation.StockInventory:
        return this.handleInventory(user, dto);
      default:
        throw new BadRequestException('Invalid showcase operation type');
    }
  }

  @Transactional()
  private async handleStockIncrement(
    dto: ShowcaseRequestDto,
    user: UserEntity,
  ) {
    const update = await this.productsService.inStockIncrement(
      dto.productID,
      dto.details as any,
    );

    return await this.showcaseRepository.save({
      type: dto.type,
      userID: user.id,
      details: {
        price: update.price,
        buyingPrice: update.buyingPrice,
        oldStock: update.oldStock,
        newStock: update.newStock,
      } as ProductStockChangeDetailsDto,
    });
  }

  @Transactional()
  private async handleStockDecrement(
    dto: ShowcaseRequestDto,
    user: UserEntity,
  ) {
    const update = await this.productsService.inStockDecrement(
      dto.productID,
      dto.details as any,
    );

    return await this.showcaseRepository.save({
      type: dto.type,
      userID: user.id,
      details: {
        price: update.price,
        buyingPrice: update.buyingPrice,
        oldStock: update.oldStock,
        newStock: update.newStock,
      } as ProductStockChangeDetailsDto,
    });
  }

  private async handlePurchaseOrRefund(dto: ShowcaseRequestDto) {
    return await this.showcaseRepository.save({
      type: dto.type,
      orderID: dto.orderID,
    });
  }

  @Transactional()
  private async handleInventory(user: UserEntity, dto: ShowcaseRequestDto) {
    if (!dto.inventoryData || dto.inventoryData.length === 0) {
      throw new BadRequestException('Inventory data is required.');
    }

    const showcase = await this.showcaseRepository.save({
      type: dto.type,
      userID: user.id,
    });

    const updatedProducts = await this.productsService.bulkUpdateStock(
      dto.inventoryData,
    );
    const inventoryEntries = updatedProducts.map((item) => ({
      showcaseOperationId: showcase.id,
      price: item.price,
      buyingPrice: item.buyingPrice,
      newStock: item.newStock,
      oldStock: item.oldStock,
    }));
    const inventoryOperations =
      await this.inventoryRepository.save(inventoryEntries);

    return Object.assign(showcase, { inventoryOperations });
  }

  cursorPaginate(query: CursorPaginateQuery) {
    const qb = this.showcaseRepository
      .createQueryBuilder('showcase')
      .leftJoinAndSelect('showcase.product', 'product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('showcase.user', 'user')
      .leftJoinAndSelect('showcase.order', 'order')
      .leftJoinAndSelect('order.user', 'order_user')
      .leftJoinAndSelect('order.items', 'order_items_rel')
      .leftJoinAndSelect(
        'order_items_rel.product',
        'order_items_rel_product_rel',
      )
      .leftJoinAndSelect('showcase.inventoryOperations', 'inventoryOperations')
      .leftJoinAndSelect(
        'inventoryOperations.product',
        'inventoryOperationsProduct',
      )
      .leftJoinAndSelect(
        'inventoryOperationsProduct.category',
        'inventoryOperationsCategory',
      )
      .addSelect((subQuery) => {
        return subQuery
          .select('SUM(cart.price * cart.quantity)', 'totalPrice')
          .from(CartEntity, 'cart')
          .where('cart.orderID = order.id');
      }, 'totalPrice')
      .addSelect((subQuery) => {
        return subQuery
          .select(
            'SUM(cart.price * cart.quantity * (1 - COALESCE(cart.sale, 0) / 100))',
            'totalPriceWithSale',
          )
          .from(CartEntity, 'cart')
          .where('cart.orderID = order.id');
      }, 'totalPriceWithSale');

    return cursorPaginate(query, qb, cursorPaginateConfig);
  }

  findOne(id: number) {
    const qb = this.showcaseRepository
      .createQueryBuilder('showcase')
      .leftJoinAndSelect('showcase.product', 'product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('showcase.user', 'user')
      .leftJoinAndSelect('showcase.order', 'order')
      .leftJoinAndSelect('order.user', 'order_user')
      .leftJoinAndSelect('order.items', 'order_items_rel')
      .leftJoinAndSelect(
        'order_items_rel.product',
        'order_items_rel_product_rel',
      )
      .leftJoinAndSelect('showcase.inventoryOperations', 'inventoryOperations')
      .leftJoinAndSelect(
        'inventoryOperations.product',
        'inventoryOperationsProduct',
      )
      .leftJoinAndSelect(
        'inventoryOperationsProduct.category',
        'inventoryOperationsCategory',
      )
      .addSelect((subQuery) => {
        return subQuery
          .select('SUM(cart.price * cart.quantity)', 'totalPrice')
          .from(CartEntity, 'cart')
          .where('cart.orderID = order.id');
      }, 'totalPrice')
      .addSelect((subQuery) => {
        return subQuery
          .select(
            'SUM(cart.price * cart.quantity * (1 - COALESCE(cart.sale, 0) / 100))',
            'totalPriceWithSale',
          )
          .from(CartEntity, 'cart')
          .where('cart.orderID = order.id');
      }, 'totalPriceWithSale')
      .where('showcase.id = :id', { id });

    return qb.getOne();
  }
}

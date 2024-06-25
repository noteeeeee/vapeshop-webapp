import { Injectable } from '@nestjs/common';
import { AuditType } from './audit.types';
import { UserEntity } from '../users';
import { AuditEntity } from './audit.entity';
import { OrderEntity } from '../orders';
import { ProductEntity } from '../products';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BalanceChangeDetailsDto,
  OrderStatusChangeDetailsDto,
  ProductStockChangeDetailsDto,
} from './audit.dto';
import {
  CursorPaginatedConfig,
  CursorPaginateQuery,
  cursorPaginate,
} from '../common';
import { FilterOperator } from 'nestjs-paginate';
import { CartEntity } from '../cart';

export const cursorPaginateConfig: CursorPaginatedConfig<AuditEntity> = {
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
export class AuditService {
  constructor(
    @InjectRepository(AuditEntity)
    private readonly auditRepository: Repository<AuditEntity>,
  ) {}

  async create(
    type:
      | AuditType.BALANCE_INCREMENT
      | AuditType.BALANCE_DECREMENT
      | AuditType.BALANCE_REFERRAL_INCREMENT
      | AuditType.BALANCE_REFERRAL_DECREMENT,
    user: UserEntity,
    details: BalanceChangeDetailsDto,
  ): Promise<AuditEntity>;
  async create(
    type: AuditType.ORDER_STATUS_UPDATED,
    order: OrderEntity,
    details: OrderStatusChangeDetailsDto,
  ): Promise<AuditEntity>;
  async create(
    type: AuditType.PRODUCT_STOCK_INCREMENT | AuditType.PRODUCT_STOCK_DECREMENT,
    product: ProductEntity,
    details: ProductStockChangeDetailsDto,
  ): Promise<AuditEntity>;
  async create(
    type: AuditType.PRODUCT_OUT_OF_STOCK,
    product: ProductEntity,
  ): Promise<AuditEntity>;
  async create(
    type: AuditType.ORDER_CREATED,
    order: OrderEntity,
  ): Promise<AuditEntity>;
  async create(
    type: AuditType.USER_CREATED,
    user: UserEntity,
  ): Promise<AuditEntity>;
  async create(
    type: AuditType,
    entity?: UserEntity | OrderEntity | ProductEntity,
    details?: Record<string, any>,
  ): Promise<AuditEntity> {
    const audit = this.auditRepository.create({ type });
    audit.details = details;

    if (entity instanceof UserEntity) {
      audit.user = entity;
    } else if (entity instanceof OrderEntity) {
      audit.order = entity;
    } else if (entity instanceof ProductEntity) {
      audit.product = entity;
    }

    return this.auditRepository.save(audit);
  }

  cursorPaginate(query: CursorPaginateQuery) {
    const qb = this.auditRepository
      .createQueryBuilder('audit')
      .leftJoinAndSelect('audit.product', 'product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('audit.user', 'user')
      .leftJoinAndSelect('audit.order', 'order')
      .leftJoinAndSelect('order.user', 'order_user')
      .leftJoinAndSelect('order.items', 'order_items_rel')
      .leftJoinAndSelect(
        'order_items_rel.product',
        'order_items_rel_product_rel',
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
}

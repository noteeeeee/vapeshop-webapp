import { FilterOperator, PaginateConfig, PaginateQuery } from 'nestjs-paginate';
import { OrderEntity } from './order.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  cursorPaginate,
  CursorPaginatedConfig,
  CursorPaginateQuery,
  dayjs,
  InjectDayjs,
  paginate,
} from '../common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { DeliveryService } from '../delivery/delivery.service';
import {
  OrderCreateStatusDto,
  OrderUpdateDto,
  RevenueByDayDto,
} from './order.dto';
import { DeliveryDto, DeliveryUpsertDto } from '../delivery';
import { instanceToInstance, instanceToPlain } from 'class-transformer';
import { OrderStatus } from './order.types';
import _ from 'lodash';
import { CartEntity } from '../cart';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserEntity } from '../users';
import { ProductsService } from '../products/products.service';
import { Transactional } from 'typeorm-transactional';
import { UsersService } from '../users/users.service';
import { ShowcaseService } from '../showcase/showcase.service';
import {ShowcaseOperation} from "../showcase";

export const paginateConfig: PaginateConfig<OrderEntity> = {
  sortableColumns: ['id', 'created', 'updated'],
  defaultSortBy: [['id', 'DESC']],
  filterableColumns: {
    status: [FilterOperator.EQ, FilterOperator.IN],
    created: [FilterOperator.BTW],
    userID: [FilterOperator.EQ, FilterOperator.IN],
  },
  searchableColumns: ['id', 'items.product.name', 'userID'],
  defaultLimit: 50,
};

export const cursorPaginateConfig: CursorPaginatedConfig<OrderEntity> = {
  cursorColumns: ['id', 'created'],
  defaultCursorColumn: 'id',
  sortableColumns: ['id', 'created', 'updated'],
  defaultSortBy: [['id', 'DESC']],
  filterableColumns: {
    status: [FilterOperator.EQ, FilterOperator.IN],
    created: [FilterOperator.BTW],
    userID: [FilterOperator.EQ, FilterOperator.IN],
  },
  searchableColumns: ['id', 'items.product.name', 'userID'],
  defaultLimit: 20,
};

@Injectable()
export class OrdersService {
  constructor(
    @InjectDayjs() private dayjs: dayjs,
    @InjectRepository(OrderEntity)
    private ordersRepo: Repository<OrderEntity>,
    private cartService: CartService,
    private deliveryService: DeliveryService,
    private productsService: ProductsService,
    private usersService: UsersService,
    private showcaseService: ShowcaseService,
  ) {}

  @Transactional()
  async create(user: UserEntity, data: OrderCreateStatusDto) {
    const items = await this.cartService.find(user.id, data.cartUUIDs);
    if (!items?.length) throw new BadRequestException('No items in your cart');

    const decrementOperations = items.map(({ product, quantity }) => ({
      id: product.id,
      quantity,
    }));
    const inStockDecrementProducts =
      await this.productsService.inStockDecrementBulk(decrementOperations);
    if (!inStockDecrementProducts?.length)
      throw new BadRequestException('No items in your cart');

    const { id: orderID } = await this.ordersRepo.save({
      deliveryData: instanceToPlain(new DeliveryDto(data)),
      userID: user.id,
      status: OrderStatus.AWAITING_PAYMENT,
    });
    await this.cartService.updateCartItemsPricesAndSales(
      user,
      orderID,
      ..._.map(items, 'uuid'),
    );

    if (data.save)
      await this.deliveryService.upsert(
        user.id,
        instanceToInstance(new DeliveryUpsertDto(data)),
      );

    const order = await this.findOne(orderID, user.id);
    await this.showcaseService.create({
      type: ShowcaseOperation.OrderPurchase,
      orderID: order.id
    }, user);

    return Object.assign(order, {
      productsExcluded: inStockDecrementProducts.length < items.length,
    });
  }

  async findOne(id: number, userID?: number) {
    const queryBuilder = this.ordersRepo
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.user', 'user')
      .leftJoinAndSelect('e.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .addSelect((subQuery) => {
        return subQuery
          .select('SUM(cart.price * cart.quantity)', 'totalPrice')
          .from(CartEntity, 'cart')
          .where('cart.orderID = e.id');
      }, 'totalPrice')
      .addSelect((subQuery) => {
        return subQuery
          .select(
            'SUM(cart.price * cart.quantity * (1 - COALESCE(cart.sale, 0) / 100))',
            'totalPriceWithSale',
          )
          .from(CartEntity, 'cart')
          .where('cart.orderID = e.id');
      }, 'totalPriceWithSale');

    // Add conditions for ID and optional userID
    queryBuilder.where('e.id = :id', { id });
    if (userID) {
      queryBuilder.andWhere('e.userID = :userID', { userID });
    }

    return queryBuilder.getOneWithVirtualColumn();
  }

  paginate(query: PaginateQuery, userID?: number) {
    const qb = this.ordersRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'order_user_rel')
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

    if (userID) {
      qb.where('order.userID = :userID', { userID });
    }

    return paginate(query, qb, paginateConfig);
  }

  cursorPaginate(query: CursorPaginateQuery, userID?: number) {
    const qb = this.ordersRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
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

    if (userID) {
      qb.where('order.userID = :userID', { userID });
    }

    return cursorPaginate(query, qb, cursorPaginateConfig);
  }

  @Transactional()
  async updateStatus(id: number, data: OrderUpdateDto, userID?: number) {
    const order = await this.ordersRepo.findOne({
      where: {
        id,
        userID,
      },
      relations: ['items', 'items.product'],
    });

    if (data.moveToCart && userID && data.status == OrderStatus.CANCELED) {
      await this.cartService.moveToCart(...order.items);
      await this.ordersRepo.delete({ id });
    } else if (!userID) {
      await this.ordersRepo.update({ id }, { status: data.status });
    }

    if (order.status == OrderStatus.CANCELED) {
      const incrementOperations = _.map(order.items, (item) => ({
        id: item.product.id,
        quantity: item.quantity,
      }));
      await this.productsService.inStockIncrementBulk(incrementOperations);
    }

    return (await this.findOne(id, userID)) || order;
  }

  @Transactional()
  async cancelByUser(userID: number, id: number, moveToCart?: boolean) {
    const order = await this.ordersRepo.findOne({
      where: {
        id,
        userID,
        status: OrderStatus.AWAITING_PAYMENT,
      },
      relations: ['items', 'items.product'],
    });

    if (!order) throw new NotFoundException();
    return this.updateStatus(
      id,
      { status: OrderStatus.CANCELED, moveToCart },
      userID,
    );
  }

  @Transactional()
  async payByUser(user: UserEntity, id: number) {
    const order = await this.findOne(id, user.id);
    if (!order || order.status != OrderStatus.AWAITING_PAYMENT)
      throw new NotFoundException();

    if (order.totalPriceWithSale >= user.balance + user.referralBalance)
      throw new BadRequestException();

    let remainingAmount = order.totalPriceWithSale;
    if (user.referralBalance > 0) {
      const referralDeduction = Math.min(user.referralBalance, remainingAmount);
      await this.usersService.decrementReferralBalance(
        user.id,
        referralDeduction,
      );
      remainingAmount -= referralDeduction;
    }

    if (remainingAmount > 0) {
      await this.usersService.decrementBalance(user.id, remainingAmount);
    }

    await this.ordersRepo.update({ id }, { status: OrderStatus.PROCESSING });
    return Object.assign(order, { status: OrderStatus.PROCESSING });
  }

  @Transactional()
  async delete(id: number, userID?: number) {
    const order = await this.ordersRepo.findOne({
      where: {
        id,
        userID,
      },
      relations: ['items'],
    });
    if (!order) throw new NotFoundException();

    if (order.status !== OrderStatus.COMPLETED) {
      const incrementOperations = _.map(order.items, (item) => ({
        id: item.product.id,
        quantity: item.quantity,
      }));
      await this.productsService.inStockIncrementBulk(incrementOperations);
    }

    const result = await this.ordersRepo.delete({ id });
    return result.affected > 0;
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async deleteOldAwaitingPaymentOrders() {
    const twentyFourHoursAgo = this.dayjs().subtract(3, 'hour').toDate();
    const currentDate = this.dayjs().toDate();

    const orders = await this.ordersRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .where(
        'order.status = :status1 AND order.created < :twentyFourHoursAgo AND order.expire IS NULL',
        {
          status1: OrderStatus.AWAITING_PAYMENT,
          twentyFourHoursAgo,
        },
      )
      .orWhere('order.status = :status2 AND order.expire < :currentDate', {
        status2: OrderStatus.AWAITING_PAYMENT,
        currentDate,
      })
      .getMany();

    if (orders?.length) {
      const incrementOperations = _.flatMap(orders, (order) =>
        _.map(order.items, (item) => ({
          id: item.product.id,
          quantity: item.quantity,
        })),
      );
      await this.productsService.inStockIncrementBulk(incrementOperations);
      await this.ordersRepo.delete(_.map(orders, 'id'));
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deleteOldOrders() {
    const oneYearAgo = this.dayjs().subtract(1, 'year').toDate();

    const orders = await this.ordersRepo.find({
      where: {
        created: LessThan(oneYearAgo),
      },
      relations: ['items'],
    });

    if (orders?.length) await this.ordersRepo.delete(_.map(orders, 'id'));
  }

  async getRevenueForLast30Days(): Promise<RevenueByDayDto[]> {
    const startDate = this.dayjs().subtract(29, 'days').toDate();

    const qb = this.ordersRepo
      .createQueryBuilder('e')
      .leftJoin(
        CartEntity,
        'cart',
        'DATE_FORMAT(cart.created, "%Y-%m-%d") = DATE_FORMAT(e.created, "%Y-%m-%d") AND cart.orderID = e.id',
      )
      .select("DATE_FORMAT(e.created, '%Y-%m-%d')", 'created')
      .addSelect(
        'SUM(cart.price * cart.quantity * (1 - COALESCE(cart.sale, 0) / 100))',
        'revenue',
      )
      .where('e.created >= :startDate', { startDate })
      .andWhere('e.status IN(:...statuses)', {
        statuses: [
          OrderStatus.IN_DELIVERY,
          OrderStatus.PROCESSING,
          OrderStatus.COMPLETED,
        ],
      })
      .groupBy('created')
      .orderBy('created', 'ASC');

    const result = await qb.getRawMany();

    const filledData = _.keyBy(result, 'created');
    const days = _.map(Array.from({ length: 30 }), (_, index) =>
      this.dayjs()
        .subtract(29 - index, 'days')
        .format('YYYY-MM-DD'),
    );

    return days.map((day) => ({
      created: day,
      revenue: _.get(filledData, `${day}.revenue`, 0),
    }));
  }

  async getRevenueForLast12Months(): Promise<RevenueByDayDto[]> {
    const startDate = this.dayjs().subtract(11, 'month').toDate();

    const qb = this.ordersRepo
      .createQueryBuilder('e')
      .leftJoin(
        CartEntity,
        'cart',
        'DATE_FORMAT(cart.created, "%Y-%m") = DATE_FORMAT(e.created, "%Y-%m") AND cart.orderID = e.id',
      )
      .select("DATE_FORMAT(e.created, '%Y-%m')", 'created')
      .addSelect(
        'SUM(cart.price * cart.quantity * (1 - COALESCE(cart.sale, 0) / 100))',
        'revenue',
      )
      .where('e.created >= :startDate', { startDate })
      .andWhere('e.status IN(:...statuses)', {
        statuses: [
          OrderStatus.IN_DELIVERY,
          OrderStatus.PROCESSING,
          OrderStatus.COMPLETED,
        ],
      })
      .groupBy('created')
      .orderBy('created', 'ASC');

    const result = await qb.getRawMany();

    const filledData = _.keyBy(result, 'created');
    const months = _.map(Array.from({ length: 12 }), (_, index) =>
      this.dayjs()
        .subtract(11 - index, 'month')
        .format('YYYY-MM'),
    );

    return months.map((month) => ({
      created: month,
      revenue: _.get(filledData, `${month}.revenue`, 0),
    }));
  }

  async getStats(userID?: number) {
    const startDate = this.dayjs().startOf('day').toDate();
    const statusConditions = [
      OrderStatus.IN_DELIVERY,
      OrderStatus.PROCESSING,
      OrderStatus.COMPLETED,
    ];

    const todayStats = await this.ordersRepo
      .createQueryBuilder('e')
      .leftJoin(
        CartEntity,
        'cart',
        'cart.created >= :startDate AND cart.orderID = e.id',
        { startDate },
      )
      .select(
        'COALESCE(SUM(cart.price * cart.quantity * (1 - COALESCE(cart.sale, 0) / 100)), 0)',
        'profitToday',
      )
      .addSelect('COUNT(cart.uuid)', 'soldItemsToday')
      .where('e.created >= :startDate', { startDate })
      .andWhere('e.status IN(:...statuses)', { statuses: statusConditions })
      .andWhere(userID ? 'e.userID = :userID' : '1=1', { userID })
      .getRawOne();

    const totalStats = await this.ordersRepo
      .createQueryBuilder('e')
      .leftJoin(
        CartEntity,
        'cart',
        'cart.created >= :startDate AND cart.orderID = e.id',
      )
      .select(
        'COALESCE(SUM(cart.price * cart.quantity * (1 - COALESCE(cart.sale, 0) / 100)), 0)',
        'profitTotal',
      )
      .addSelect('COUNT(cart.uuid)', 'soldItemsTotal')
      .andWhere('e.status IN(:...statuses)', {
        statuses: statusConditions,
      })
      .andWhere(userID ? 'e.userID = :userID' : '1=1', { userID })
      .getRawOne();

    return Object.assign(todayStats, totalStats);
  }
}

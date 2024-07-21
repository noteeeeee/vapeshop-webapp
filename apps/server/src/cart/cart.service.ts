import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDayjs, dayjs } from '../common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './cart.entity';
import { ProductsService } from '../products/products.service';
import { In, IsNull, Repository, DeepPartial, LessThan } from 'typeorm';
import _ from 'lodash';
import { CartCreateDto, CartUpdateDto } from './cart.dto';
import { Transactional } from 'typeorm-transactional';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserEntity } from '../users';

@Injectable()
export class CartService {
  constructor(
    @InjectDayjs() private dayjs: dayjs,
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    private productsService: ProductsService,
  ) {}

  count(userID: number) {
    return this.cartRepository.countBy({ userID, orderID: IsNull() });
  }

  async updateCartItemsPricesAndSales(
    user: UserEntity,
    orderID: number,
    ...uuids: string[]
  ) {
    const cartItems = await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.product', 'product')
      .where('cart.uuid IN (:...uuids)', { uuids })
      .getMany();

    const totalQuantity = _.sumBy(cartItems, 'quantity');
    const updates = cartItems.map((cartItem) => {
      const maxQuantitySale = Math.max(
        cartItem.product.quantitySales_5,
        cartItem.product.quantitySales_10,
        cartItem.product.quantitySales_20,
        cartItem.product.quantitySales_40,
        cartItem.product.quantitySales_100,
      );

      const totalSale =
        (cartItem.product.sale || 0) + maxQuantitySale + user.discount;
      const applicableSale = Math.min(totalSale, 99);

      return {
        uuid: cartItem.uuid,
        price: Math.max(cartItem.product.price, cartItem.product.buyingPrice),
        buyingPrice: cartItem.product.buyingPrice,
        sale: applicableSale,
        orderID,
      };
    });

    await this.cartRepository.save(updates);
  }

  async moveToCart(...items: CartCreateDto[]) {
    const uuids = _.map(items, 'uuid');
    await this.cartRepository.update(uuids, { orderID: null });
  }

  find(userID: number, uuids?: string[]) {
    return this.cartRepository.find({
      where: {
        userID,
        orderID: IsNull(),
        ...(uuids ? { uuid: In(uuids) } : undefined),
      },
      relations: ['product'],
    });
  }

  async create(userID: number, item: CartCreateDto) {
    const product = await this.productsService.findOne(item.productID);
    if (!product)
      throw new NotFoundException(
        `Product with ID ${item.productID} not found.`,
      );

    if (product.inStock < item.quantity)
      throw new BadRequestException(
        `Product with ID ${item.productID} is out of stock.`,
      );

    const cartItem = this.cartRepository.create({
      ...item,
      userID,
    });
    return Object.assign(await this.cartRepository.save(cartItem), { product });
  }

  @Transactional()
  async update(
    userID: number,
    ...updates: CartUpdateDto[] | DeepPartial<CartEntity>[]
  ) {
    const updatedCartItems: CartEntity[] = [];

    for (const update of updates) {
      const cartItem = await this.cartRepository.findOne({
        where: {
          uuid: update.uuid,
          userID,
        },
        relations: ['product'],
      });
      if (!cartItem)
        throw new NotFoundException(
          `Cart item with UUID ${update.uuid} not found.`,
        );

      if (cartItem.product.inStock < update.quantity)
        throw new BadRequestException(
          `Product with ID ${cartItem.productID} is out of stock.`,
        );

      await this.cartRepository.update(
        { uuid: update.uuid },
        _.pick(update, 'quantity'),
      );
      updatedCartItems.push(
        Object.assign(cartItem, _.pick(update, 'quantity')),
      );
    }

    return updatedCartItems;
  }

  async delete(userID: number, uuid: string) {
    const cartItem = await this.cartRepository.findOneBy({
      userID,
      uuid,
      orderID: IsNull(),
    });
    if (!cartItem) throw new NotFoundException();

    const result = await this.cartRepository.delete({ userID, uuid });
    return result.affected > 0;
  }

  async clear(userID: number): Promise<void> {
    const items = await this.cartRepository.findBy({
      userID,
      orderID: IsNull(),
    });

    await this.cartRepository.delete({ uuid: In(_.map(items, 'uuid')) });
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async clearOldCartRecords() {
    const threshold = this.dayjs().subtract(30, 'days').toDate();
    const items = await this.cartRepository.findBy({
      created: LessThan(threshold),
      orderID: IsNull(),
    });

    await this.cartRepository.delete({ userID: In(_.map(items, 'uuid')) });
  }
}

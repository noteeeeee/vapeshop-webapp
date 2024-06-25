import { Module } from '@nestjs/common';
import { CartModule } from '../cart/cart.module';
import { DeliveryModule } from '../delivery/delivery.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    CartModule,
    DeliveryModule,
    ProductsModule,
    UsersModule,
    TypeOrmModule.forFeature([OrderEntity]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}

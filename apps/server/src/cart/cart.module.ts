import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './cart.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity]), ProductsModule],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}

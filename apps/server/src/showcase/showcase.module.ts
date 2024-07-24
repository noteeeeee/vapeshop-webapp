import { forwardRef, Global, Module } from '@nestjs/common';
import { ShowcaseService } from './showcase.service';
import { ShowcaseController } from './showcase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryEntity, ShowcaseEntity } from './entities';
import { ProductsModule } from '../products/products.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([ShowcaseEntity, InventoryEntity]),
    forwardRef(() => ProductsModule),
  ],
  providers: [ShowcaseService],
  controllers: [ShowcaseController],
  exports: [ShowcaseService],
})
export class ShowcaseModule {}

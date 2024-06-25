import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersMiddleware } from './users.telegraf-middleware';
import { UserEntity } from './user.entity';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, UsersMiddleware],
  imports: [TypeOrmModule.forFeature([UserEntity]), UsersModule],
  exports: [UsersService, UsersMiddleware],
  controllers: [UsersController],
})
export class UsersModule {}

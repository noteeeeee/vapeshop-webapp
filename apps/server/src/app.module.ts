import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import ormconfig from './ormconfig';
import { addTransactionalDataSource } from 'typeorm-transactional';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';
import { DayJSModule, RedisClientWithLogger } from './common';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { EnvConfig } from '@vapeshop-webapp/config';
import type { RedisOptions } from 'ioredis';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { StorageModule } from './storage/storage.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { DeliveryModule } from './delivery/delivery.module';

dayjs.locale('ru');
dayjs.extend(localizedFormat);
dayjs.extend(duration);
dayjs.extend(relativeTime);

const redisInstance = new RedisClientWithLogger({
  host: EnvConfig.REDIS_HOST,
  port: EnvConfig.REDIS_PORT,
  password: EnvConfig.REDIS_PASSWORD,
} as RedisOptions);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ormconfig.options,
      async dataSourceFactory(options) {
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    DayJSModule.forRoot({
      dayjs,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'telegram',
          ttl: EnvConfig.TELEGRAM_THROTTLER_TTL,
          limit: EnvConfig.TELEGRAM_THROTTLER_LIMIT,
        },
      ],
      storage: new ThrottlerStorageRedisService(redisInstance),
    }),
    StorageModule,
    AuthModule,
    BotModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    CartModule,
    DeliveryModule,
  ],
})
export class AppModule {}

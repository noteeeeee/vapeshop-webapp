import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { WebAppStrategy } from './strategies';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Module({
  imports: [UsersModule],
  providers: [
    WebAppStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard(['webapp']),
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}

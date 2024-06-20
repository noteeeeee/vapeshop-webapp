import { Injectable } from '@nestjs/common';
import { TelegrafModuleOptions, TelegrafOptionsFactory } from 'nestjs-telegraf';
import { EnvConfig } from '@vapeshop-webapp/config';
import { UserContext } from '../users/users.types';
import { UsersMiddleware } from '../users/users.telegraf-middleware';

@Injectable()
export class BotConfigService implements TelegrafOptionsFactory {
  constructor(private userMiddleware: UsersMiddleware) {}

  async createTelegrafOptions(): Promise<TelegrafModuleOptions> {
    return {
      token: EnvConfig.TELEGRAM_BOT_TOKEN,
      launchOptions: {
        dropPendingUpdates: true,
        webhook:
          EnvConfig.TELEGRAM_WEBHOOK_PATH && EnvConfig.API_BASEURL
            ? {
                domain: new URL(EnvConfig.API_BASEURL).host,
                hookPath: EnvConfig.TELEGRAM_WEBHOOK_PATH,
              }
            : undefined,
      },
      middlewares: [
        (ctx: UserContext, next: Function) =>
          this.userMiddleware.register(ctx, next),
      ],
    };
  }
}

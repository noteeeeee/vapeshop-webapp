import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { InjectBot, TelegrafModule } from 'nestjs-telegraf';
import { BotConfigService } from './bot-options.factory';
import { Telegraf } from 'telegraf';
import { BotUpdate } from './bot.update';
import { UsersModule } from '../users/users.module';
import * as tg from "telegraf/typings/core/types/typegram";
import {EnvConfig} from "@vapeshop-webapp/config";
import {BotController} from "./bot.controller";

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useClass: BotConfigService,
      imports: [UsersModule],
    }),
    UsersModule,
  ],
  providers: [BotUpdate],
  controllers: [BotController]
})
export class BotModule implements OnApplicationBootstrap {
  private logger = new Logger('TelegramBot');

  constructor(@InjectBot() private bot: Telegraf) {}

  async onApplicationBootstrap() {
    const me = await this.bot.telegram.getMe();
    this.logger.log(`Bot @${me.username} (${me.first_name}) launched`);
  }
}

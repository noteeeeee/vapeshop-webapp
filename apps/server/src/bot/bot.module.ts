import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { InjectBot, TelegrafModule } from 'nestjs-telegraf';
import { BotConfigService } from './bot-options.factory';
import { Telegraf } from 'telegraf';
import { BotUpdate } from './bot.update';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useClass: BotConfigService,
      imports: [UsersModule],
    }),
    UsersModule,
  ],
  providers: [BotUpdate],
})
export class BotModule implements OnApplicationBootstrap {
  private logger = new Logger('TelegramBot');

  constructor(@InjectBot() private bot: Telegraf) {}

  async onApplicationBootstrap() {
    const me = await this.bot.telegram.getMe();
    this.logger.log(`Bot @${me.username} (${me.first_name}) launched`);
  }
}

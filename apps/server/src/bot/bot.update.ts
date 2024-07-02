import { Command, Ctx, Start, Update } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';
import { EnvConfig } from '@vapeshop-webapp/config';
import * as tg from 'telegraf/typings/core/types/typegram';
import { UseFilters, UseGuards } from '@nestjs/common';
import { IsAdminGuard } from '../admin';
import { VoidExceptionFilter } from '../common';

@Update()
@UseFilters(VoidExceptionFilter)
export class BotUpdate {
  @Start()
  async onStart(@Ctx() ctx: Context) {
    const menuButton: tg.MenuButton = {
      type: 'web_app',
      text: 'Open App',
      web_app: {
        url: EnvConfig.APP_BASEURL,
      },
    };
    await ctx.setChatMenuButton(menuButton);
    await ctx.replyWithHTML(
      '<b>👋 Приветствуем вас в нашем магазине!</b>\n\n' +
        '<em>Чтобы начать пользоваться нашим сервисом, пожалуйста, откройте наш веб-приложение, нажав на кнопку ниже.</em>\n\n' +
        'В нашем веб-приложении вы сможете:\n' +
        '- Просмотреть и заказать нашу продукцию 🔍\n' +
        '- Узнать о текущих акциях и скидках 🎉\n' +
        '- Получить персональные рекомендации 🌟\n\n' +
        '<em>Спасибо, что выбрали нас! Если у вас возникнут вопросы, не обращайтесь к нашей поддержке.</em>',
      Markup.inlineKeyboard([
        Markup.button.webApp('Открыть приложение', EnvConfig.APP_BASEURL),
      ]),
    );
  }

  @Command('admin')
  @UseGuards(IsAdminGuard)
  async admin(@Ctx() ctx: Context) {
    await ctx.replyWithHTML(
      `<b>🔐 Пожалуйста, нажмите кнопку ниже, чтобы открыть админ-панель</b>`,
      Markup.inlineKeyboard([
        Markup.button.webApp('Открыть приложение', `${EnvConfig.APP_BASEURL}/admin`),
      ]),
    );
  }
}

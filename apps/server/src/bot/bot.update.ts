import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';
import { EnvConfig } from '@vapeshop-webapp/config';

@Update()
export class BotUpdate {
  @Start()
  async onStart(@Ctx() ctx: Context) {
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
}

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { resolveDynamicProviders } from 'nestjs-dynamic-providers';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { WinstonModule } from 'nest-winston';
import {
  initTypeORMAddons,
  loggerInstance,
  TransformResponseInterceptor,
} from './common';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { EnvConfig } from '@vapeshop-webapp/config';
import { Telegraf } from 'telegraf';
import { getBotToken } from 'nestjs-telegraf';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fs from 'fs';
import {createStorageDirs} from "./storage/storage.utils";

async function bootstrap() {
  await resolveDynamicProviders();
  initializeTransactionalContext();
  initTypeORMAddons();
  createStorageDirs()

  const httpsOptions = {
    key: fs.readFileSync('../../compat/127.0.0.1-key.pem'),
    cert: fs.readFileSync('../../compat/127.0.0.1.pem'),
  };

  const logger = new Logger('TelegramBot');
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ instance: loggerInstance }),
    httpsOptions: EnvConfig.DEVELOPMENT ? httpsOptions : undefined,
  });
  const bot: Telegraf = app.get(getBotToken());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(
    new TransformResponseInterceptor(app.get(Reflector)),
  );
  app.enableCors();
  bot.catch(logger.error);

  const config = new DocumentBuilder()
    .setTitle('OpenAPI')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  if (EnvConfig.TELEGRAM_WEBHOOK_PATH)
    app.use(bot.webhookCallback(EnvConfig.TELEGRAM_WEBHOOK_PATH));

  await app.listen(3001);
}

bootstrap();

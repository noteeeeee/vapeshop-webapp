import { from } from "env-var";
import { config } from "dotenv";
import { resolve } from "path";

const env = from(process.env);
const file = ".env";
config({ path: resolve(__dirname, "../../..", file) });

export const EnvConfig = {
  DEVELOPMENT: process.env.NODE_ENV == "development",

  // Domains
  APP_BASEURL: env.get("APP_BASEURL").required().asString(),
  API_BASEURL: env.get("API_BASEURL").required().asString(),
  JWT_SECRET: env.get("JWT_SECRET").required().asString(),

  // Database
  DATABASE_TYPE: env.get("DATABASE_TYPE").default("mysql").asString(),
  DATABASE_HOST: env.get("DATABASE_HOST").default("127.0.0.1").asString(),
  DATABASE_PORT: env.get("DATABASE_PORT").default(3306).asPortNumber(),
  DATABASE_USER: env.get("DATABASE_USER").asString(),
  DATABASE_PASSWORD: env.get("DATABASE_PASSWORD").asString(),
  DATABASE_NAME: env.get("DATABASE_NAME").required().asString(),

  // Redis
  REDIS_HOST: env.get("REDIS_HOST").default("127.0.0.1").asString(),
  REDIS_PORT: env.get("REDIS_PORT").default(6379).asPortNumber(),
  REDIS_PASSWORD: env.get("REDIS_PASSWORD").asString(),

  // Telegram
  TELEGRAM_BOT_TOKEN: env.get("TELEGRAM_BOT_TOKEN").required().asString(),
  TELEGRAM_LOGS_CHANNEL: env.get("TELEGRAM_LOGS_CHANNEL").required().asInt(),
  TELEGRAM_WEBHOOK_PATH: env.get("TELEGRAM_WEBHOOK_PATH").asString(),

  TELEGRAM_THROTTLER_TTL: env.get('THROTTLER_TELEGRAM_TTL').default(5000).asInt(),
  TELEGRAM_THROTTLER_LIMIT: env.get('THROTTLER_TELEGRAM_LIMIT').default(10).asInt(),


  THROTTLER_TTL: env.get("THROTTLER_TTL").default(1000).asInt(),
  THROTTLER_LIMIT: env.get("THROTTLER_LIMIT").default(5).asInt(),

  // SMTP_SERVICE: env.get("SMTP_SERVICE").asString(),
  // SMTP_HOST: env.get("SMTP_HOST").asString(),
  // SMTP_PORT: env.get("SMTP_PORT").asPortNumber(),
  // SMTP_IGNORE_TLS: env.get("SMTP_IGNORE_TLS").asBool(),
  // SMTP_SECURE: env.get("SMTP_SECURE").asBool(),
  // SMTP_USER: env.get("SMTP_USER").asString(),
  // SMTP_PASSWORD: env.get("SMTP_PASSWORD").asString(),
  // MAILER_FROM: env.get("MAILER_FROM").required().asString(),
};

import { EnvConfig } from '@vapeshop-webapp/config';
import * as winston from 'winston';
import { loggerUtilities } from './logger-utilites';
import path from 'path';
import fs from 'fs';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDirectory = '../../logs';

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const errorTransport = new DailyRotateFile({
  filename: path.join(logDirectory, 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m', // Maximum log file size (e.g., 20 megabytes)
  maxFiles: '7d', // Keep logs for 7 days
  level: 'error', // Log level for this transport
  format: winston.format.combine(
    winston.format.timestamp({ format: 'HH:mm:ss' }),
    winston.format((info) => {
      if (info.message && info.message.endsWith('Unknown command')) {
        return false; // Ignore this log entry
      }
      return info;
    })(),
    loggerUtilities.format.nestLike(undefined, {
      colors: false,
      prettyPrint: true,
    }),
  ),
});

const infoTransport = new DailyRotateFile({
  filename: path.join(logDirectory, 'info-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  createSymlink: true,
  symlinkName: 'latest.log',
  maxSize: '20m', // Maximum log file size (e.g., 20 megabytes)
  maxFiles: '3d', // Keep logs for 7 days
  level: 'info', // Log level for this transport
  format: winston.format.combine(
    winston.format.timestamp({ format: 'HH:mm:ss' }),
    loggerUtilities.format.nestLike(undefined, {
      colors: false,
      prettyPrint: true,
    }),
  ),
});

export const loggerInstance = winston.createLogger({
  level: EnvConfig.DEVELOPMENT ? 'debug' : 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'HH:mm:ss' }),
        winston.format.ms(),
        loggerUtilities.format.nestLike(undefined, {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
    errorTransport, // Separate error log files
    infoTransport, // Separate info log files
  ],
});

import { Redis } from 'ioredis';
import { loggerInstance } from './logger-instance';

export class RedisClientWithLogger extends Redis {
  constructor(options) {
    super(options);

    this.on('error', (error) => {
      loggerInstance.error('Redis error', error);
    });
  }
}

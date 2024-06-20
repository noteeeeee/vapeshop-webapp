import { DynamicModule, Module } from '@nestjs/common';
import { DAYJS } from './dayjs.decorator';
import djs from 'dayjs';
import { dayjs } from './dayjs.type';

@Module({})
export class DayJSModule {
  static forRoot(options?: {
    dayjs?: dayjs;
    isGlobal?: boolean;
  }): DynamicModule {
    const providers = [
      {
        provide: DAYJS,
        useValue: options?.dayjs ? options.dayjs : djs,
      },
    ];

    const module = {
      providers,
      module: DayJSModule,
      exports: [DAYJS],
    };

    if (options?.isGlobal) {
      return {
        global: true,
        ...module,
      };
    } else {
      return module;
    }
  }
}

import { Inject } from '@nestjs/common';

export const DAYJS = Symbol('DAYJS');

export function InjectDayjs() {
  return Inject(DAYJS);
}

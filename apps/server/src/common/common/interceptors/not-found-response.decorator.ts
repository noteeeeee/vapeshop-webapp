import { UseInterceptors } from '@nestjs/common';
import { NotFoundResponseInterceptor } from './not-found-response.interceptor';

export const NotFoundExceptionResponse = () => {
  return UseInterceptors(NotFoundResponseInterceptor);
};

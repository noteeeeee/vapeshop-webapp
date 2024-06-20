import {
  ApiExcludeEndpoint as SwaggerApiExcludeEndpoint,
  ApiExcludeController as SwaggerApiExcludeController,
} from '@nestjs/swagger';
import { EnvConfig } from '@vapeshop-webapp/config';

export const ApiExcludeEndpoint = () => {
  if (!EnvConfig.DEVELOPMENT) {
    return SwaggerApiExcludeEndpoint();
  } else return () => {};
};

export const ApiExcludeController = () => {
  if (!EnvConfig.DEVELOPMENT) {
    return SwaggerApiExcludeController();
  } else return () => {};
};

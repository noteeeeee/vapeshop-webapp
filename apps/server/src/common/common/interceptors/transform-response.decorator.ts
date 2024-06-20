import { SetMetadata, Type } from '@nestjs/common';

export const TransformResponse = (...dtos: Type<any>[]) => {
  return SetMetadata('transformResponse', dtos);
};

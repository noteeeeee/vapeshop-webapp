import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkCursorPaginatedResponse } from './api-ok-swagger-paginated-response.decorator';
import { ApiCursorPaginationQuery } from './api-cursor-paginated-query.decorator';
import { PaginateConfig } from 'nestjs-paginate';

export function CursorPaginatedSwaggerDocs<DTO extends Type<unknown>>(
  dto: DTO,
  paginatedConfig: PaginateConfig<any>,
) {
  return applyDecorators(
    ApiOkCursorPaginatedResponse(dto, paginatedConfig),
    ApiCursorPaginationQuery(paginatedConfig),
  );
}

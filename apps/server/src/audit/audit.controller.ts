import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import { cursorPaginateConfig, AuditService } from './audit.service';
import { AuditDto } from './audit.dto';
import {
  CursorPaginatedSwaggerDocs,
  CursorPaginateQuery,
  TransformResponse,
} from '../common';
import {IsAdminGuard} from "../admin";

@UseGuards(IsAdminGuard)
@ApiTags('Audit')
@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  @ApiOperation({ summary: 'Cursor paginate list of audit entries' })
  @TransformResponse(AuditDto)
  @CursorPaginatedSwaggerDocs(AuditDto, cursorPaginateConfig)
  async cursorPaginate(@Query() query: CursorPaginateQuery) {
    return this.auditService.cursorPaginate(query);
  }
}

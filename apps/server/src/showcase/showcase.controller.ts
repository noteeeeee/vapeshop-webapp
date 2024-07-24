import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { cursorPaginateConfig, ShowcaseService } from './showcase.service';
import { ShowcaseDto, ShowcaseRequestDto } from './showcase.dto';
import {
  ApiExcludeEndpoint,
  CursorPaginatedSwaggerDocs,
  CursorPaginateQuery,
  TransformResponse,
} from '../common';
import { IsAdminGuard } from '../admin';
import { User } from '../auth/decorators';
import { UserEntity } from '../users';

@ApiBearerAuth() // Add this to indicate that the endpoint requires authentication
@ApiTags('Showcase')
@Controller('showcase')
export class ShowcaseController {
  constructor(private readonly showcaseService: ShowcaseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new showcase entry' })
  @ApiBody({ type: ShowcaseRequestDto })
  @ApiOkResponse({
    description: 'The showcase entry has been successfully created',
    type: ShowcaseDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden. User does not have sufficient permissions.',
  })
  @TransformResponse(ShowcaseDto)
  @UseGuards(IsAdminGuard)
  async create(@Body() data: ShowcaseRequestDto, @User() user: UserEntity) {
    return this.showcaseService.create(data, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a showcase entry by ID' })
  @ApiParam({ name: 'id', description: 'Showcase entry ID', type: Number })
  @ApiOkResponse({
    description: 'The showcase entry has been successfully retrieved',
    type: ShowcaseDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden. User does not have sufficient permissions.',
  })
  @TransformResponse(ShowcaseDto)
  async findOne(@Param('id') id: number) {
    return this.showcaseService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get a paginated list of showcase entries' })
  @ApiOkResponse({
    description: 'A paginated list of showcase entries',
    type: CursorPaginatedSwaggerDocs(ShowcaseDto, cursorPaginateConfig),
  })
  @ApiForbiddenResponse({
    description: 'Forbidden. User does not have sufficient permissions.',
  })
  @TransformResponse(ShowcaseDto)
  async cursorPaginate(@Query() query: CursorPaginateQuery) {
    return this.showcaseService.cursorPaginate(query);
  }
}

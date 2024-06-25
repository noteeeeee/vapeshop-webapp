import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { CategoryFiltersService } from '../services';
import { ApiExcludeEndpoint, TransformResponse } from '../../common';
import { IsAdminGuard } from '../../admin';
import { CategoryFilterDto, CreateFilterDto, UpdateFilterDto } from '../dto';

@ApiTags('Filters')
@Controller('filters')
export class CategoryFiltersController {
  constructor(private readonly filtersService: CategoryFiltersService) {}

  @Get(':categoryID')
  @TransformResponse(CategoryFilterDto)
  @ApiOperation({ summary: 'Get all filters for category' })
  @ApiOkResponse({
    description: 'Returns all filters for category',
    type: [CategoryFilterDto],
  })
  @ApiParam({ name: 'id', description: 'Category ID', type: Number })
  async findAll(@Param('categoryID', ParseIntPipe) categoryID: number) {
    return this.filtersService.find(categoryID);
  }

  @Post()
  @ApiExcludeEndpoint()
  @TransformResponse(CategoryFilterDto)
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: 'Create a new filter' })
  @ApiBody({ type: CreateFilterDto })
  @ApiOkResponse({
    description: 'The filter has been successfully created',
    type: CreateFilterDto,
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async create(@Body() data: CreateFilterDto) {
    return this.filtersService.create(data);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  @TransformResponse(CategoryFilterDto)
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: 'Update a filter by ID' })
  @ApiParam({ name: 'id', description: 'Filter ID', type: Number })
  @ApiBody({ type: UpdateFilterDto })
  @ApiOkResponse({
    description: 'The filter has been successfully updated',
    type: CategoryFilterDto,
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateFilterDto,
  ) {
    return this.filtersService.update(id, data);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: 'Delete a filter by ID' })
  @ApiParam({ name: 'id', description: 'Filter ID', type: Number })
  @ApiOkResponse({ description: 'The filter has been successfully deleted' })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.filtersService.delete(id);
  }
}

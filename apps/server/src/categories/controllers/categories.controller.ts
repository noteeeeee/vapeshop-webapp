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
import { CategoriesService } from '../services';
import { ApiExcludeEndpoint, TransformResponse } from '../../common';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { IsAdminGuard } from '../../admin';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @TransformResponse(CategoryDto)
  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({
    description: 'Returns all categories',
    type: [CategoryDto],
  })
  async findAll() {
    return this.categoriesService.find();
  }

  @Post()
  @ApiExcludeEndpoint()
  @TransformResponse(CategoryDto)
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiOkResponse({
    description: 'The category has been successfully created',
    type: CreateCategoryDto,
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async create(@Body() data: CreateCategoryDto) {
    return this.categoriesService.create(data);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  @TransformResponse(CategoryDto)
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiParam({ name: 'id', description: 'Brand ID', type: Number })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiOkResponse({
    description: 'The category has been successfully updated',
    type: CategoryDto,
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, data);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiParam({ name: 'id', description: 'Category ID', type: Number })
  @ApiOkResponse({ description: 'The category has been successfully deleted' })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.categoriesService.delete(id);
  }
}

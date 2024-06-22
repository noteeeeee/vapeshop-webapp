import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiExcludeEndpoint, TransformResponse } from '../common';
import { paginateConfig, ProductsService } from './products.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IsAdminGuard } from '../admin';
import { CreateProductDto, ProductDto, UpdateProductDto } from './dto';
import { Paginate, PaginatedSwaggerDocs, PaginateQuery } from 'nestjs-paginate';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('paginate')
  @ApiOperation({
    summary: 'Paginate Products',
    description: 'Get paginated list of products',
  })
  @TransformResponse(ProductDto)
  @PaginatedSwaggerDocs(ProductDto, paginateConfig)
  paginate(@Paginate() query: PaginateQuery) {
    return this.productsService.paginate(query);
  }

  @ApiExcludeEndpoint()
  @Post()
  @TransformResponse(ProductDto)
  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiOkResponse({
    description: 'The product has been successfully created',
    type: ProductDto,
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async create(@Body() data: CreateProductDto) {
    return this.productsService.create(data);
  }

  @ApiExcludeEndpoint()
  @Patch(':id')
  @TransformResponse(ProductDto)
  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID', type: Number })
  @ApiBody({ type: UpdateProductDto })
  @ApiOkResponse({
    description: 'The product has been successfully updated',
    type: ProductDto,
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async update(@Param('id') id: number, @Body() data: UpdateProductDto) {
    return this.productsService.update(id, data);
  }

  @ApiExcludeEndpoint()
  @Delete(':id')
  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID', type: Number })
  @ApiOkResponse({ description: 'The product has been successfully deleted' })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async delete(@Param('id') id: number): Promise<boolean> {
    return this.productsService.delete(id);
  }
}

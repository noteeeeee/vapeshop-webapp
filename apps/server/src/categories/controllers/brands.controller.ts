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
import { BrandsService } from '../services';
import { ApiExcludeEndpoint, TransformResponse } from '../../common';
import { BrandDto, CreateBrandDto, UpdateBrandDto } from '../dto';
import { IsAdminGuard } from '../../admin';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  @TransformResponse(BrandDto)
  @ApiOperation({ summary: 'Get all brands' })
  @ApiOkResponse({
    description: 'Returns all brands',
    type: [BrandDto],
  })
  async findAll() {
    return this.brandsService.find();
  }

  @Post()
  @ApiExcludeEndpoint()
  @TransformResponse(BrandDto)
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: 'Create a new brand' })
  @ApiBody({ type: CreateBrandDto })
  @ApiOkResponse({
    description: 'The brand has been successfully created',
    type: CreateBrandDto,
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async create(@Body() data: CreateBrandDto) {
    return this.brandsService.create(data);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  @TransformResponse(BrandDto)
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: 'Update a brand by ID' })
  @ApiParam({ name: 'id', description: 'Brand ID', type: Number })
  @ApiBody({ type: UpdateBrandDto })
  @ApiOkResponse({
    description: 'The brand has been successfully updated',
    type: BrandDto,
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, data);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: 'Delete a brand by ID' })
  @ApiParam({ name: 'id', description: 'Brand ID', type: Number })
  @ApiOkResponse({ description: 'The brand has been successfully deleted' })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.brandsService.delete(id);
  }
}

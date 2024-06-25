import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { cursorPaginateConfig, OrdersService } from './orders.service';
import {
  OrderCreateResponseDto,
  OrderCreateStatusDto,
  OrderDto,
  OrderStatsDto,
} from './order.dto';
import {
  CursorPaginate,
  CursorPaginatedSwaggerDocs,
  CursorPaginateQuery,
  NotFoundExceptionResponse,
  TransformResponse,
} from '../common';
import { User } from '../auth/decorators';
import { UserEntity } from '../users';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create an order' })
  @ApiOkResponse({
    description: 'The order has been successfully created.',
    type: OrderCreateResponseDto,
  })
  @ApiBody({ type: OrderCreateStatusDto })
  @TransformResponse(OrderCreateResponseDto)
  async create(@User() user: UserEntity, @Body() data: OrderCreateStatusDto) {
    return this.ordersService.create(user, data);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get order statistics' })
  @ApiOkResponse({
    description: 'Statistics retrieved successfully.',
    type: OrderStatsDto,
  })
  @TransformResponse(OrderStatsDto)
  async getStats(@User() user: UserEntity) {
    return this.ordersService.getStats(user.id);
  }

  @Get(':orderID')
  @ApiOperation({ summary: 'Find one order by ID' })
  @ApiOkResponse({
    description: 'Found one order by ID.',
    type: OrderDto,
  })
  @ApiParam({ name: 'orderID', type: 'number' })
  @TransformResponse(OrderDto)
  @NotFoundExceptionResponse()
  async findOne(@User() user: UserEntity, @Param('orderID') orderID: number) {
    return this.ordersService.findOne(orderID, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Paginate list of orders' })
  @TransformResponse(OrderDto)
  @CursorPaginatedSwaggerDocs(OrderDto, cursorPaginateConfig)
  async cursorPaginate(
    @User() user: UserEntity,
    @CursorPaginate() query: CursorPaginateQuery,
  ) {
    return this.ordersService.cursorPaginate(query, user.id);
  }

  @Patch(':orderID/pay')
  @ApiOperation({ summary: 'Pay an order' })
  @ApiOkResponse({ description: 'Order payed successfully.' })
  @ApiParam({ name: 'orderID', type: 'number' })
  @TransformResponse(OrderDto)
  async pay(@User() user: UserEntity, @Param('orderID') orderID: number) {
    return this.ordersService.payByUser(user, orderID);
  }

  @Delete(':orderID/cancel')
  @ApiOperation({ summary: 'Cancel an order' })
  @ApiOkResponse({ description: 'Order canceled successfully.' })
  @ApiParam({ name: 'orderID', type: 'number' })
  @TransformResponse(OrderDto)
  async cancel(
    @User() user: UserEntity,
    @Param('orderID') orderID: number,
    @Query('moveToCart') moveToCart: boolean,
  ) {
    return this.ordersService.cancelByUser(user.id, orderID, moveToCart);
  }
}

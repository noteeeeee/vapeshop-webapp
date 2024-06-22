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
  Post,
  Query,
} from '@nestjs/common';
import { cursorPaginateConfig, OrdersService } from './orders.service';
import { OrderCreateStatusDto, OrderDto } from './order.dto';
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
    type: OrderDto,
  })
  @ApiBody({ type: OrderCreateStatusDto })
  @TransformResponse(OrderDto)
  async create(@User() user: UserEntity, @Body() data: OrderCreateStatusDto) {
    return this.ordersService.create(user.id, data);
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

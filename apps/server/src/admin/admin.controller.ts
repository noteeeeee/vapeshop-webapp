import {
  ApiExcludeController,
  NotFoundExceptionResponse,
  TransformResponse,
} from '../common';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { IsAdminGuard } from './guards';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  UsersService,
  paginateConfig as usersPaginateConfig,
} from '../users/users.service';
import {
  OrderAdminResponseDto,
  OrderStatsDto,
  OrderUpdateDto,
  RevenueByDayDto,
} from '../orders';
import { Paginate, PaginatedSwaggerDocs, PaginateQuery } from 'nestjs-paginate';
import {
  OrdersService,
  paginateConfig as ordersPaginateConfig,
} from '../orders/orders.service';
import { UserDto, UserEntity, UsersStats, UserUpdateDto } from '../users';
import { User } from '../auth/decorators';

@ApiExcludeController()
@ApiForbiddenResponse()
@UseGuards(IsAdminGuard)
@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private ordersService: OrdersService,
    private usersService: UsersService,
  ) {}

  @Get('orders')
  @ApiOperation({ summary: 'Paginate list of orders' })
  @ApiOkResponse({ description: 'Paginated list of orders.' })
  @TransformResponse(OrderAdminResponseDto)
  @PaginatedSwaggerDocs(OrderAdminResponseDto, ordersPaginateConfig)
  async ordersPaginate(@Paginate() query: PaginateQuery) {
    return this.ordersService.paginate(query);
  }

  @Get('orders/stats')
  @ApiOperation({ summary: 'Get stats' })
  @ApiOkResponse({
    description: 'Stats retrieved successfully.',
    type: OrderStatsDto,
    isArray: true,
  })
  @TransformResponse(OrderStatsDto)
  async ordersStats() {
    return this.ordersService.getStats();
  }

  @Get('orders/revenue/days')
  @ApiOperation({ summary: 'Get revenue for the last 30 days' })
  @ApiOkResponse({
    description: 'Revenue data retrieved successfully.',
    type: RevenueByDayDto,
    isArray: true,
  })
  @TransformResponse(RevenueByDayDto)
  async getRevenueForLast30Days() {
    return this.ordersService.getRevenueForLast30Days();
  }

  @Get('orders/revenue/months')
  @ApiOperation({ summary: 'Get revenue for the last 12 months' })
  @ApiOkResponse({
    description: 'Revenue data retrieved successfully.',
    type: RevenueByDayDto,
    isArray: true,
  })
  @TransformResponse(RevenueByDayDto)
  async getRevenueForLast12Months() {
    return this.ordersService.getRevenueForLast12Months();
  }

  @Get('orders/:orderID')
  @ApiOperation({ summary: 'Get an order' })
  @ApiOkResponse({ description: 'Order updated successfully.' })
  @ApiParam({ name: 'orderID', type: 'number' })
  @TransformResponse(OrderAdminResponseDto)
  @NotFoundExceptionResponse()
  async ordersFindOne(@Param('orderID') orderID: number) {
    return this.ordersService.findOne(orderID);
  }

  @Patch('orders/:orderID')
  @ApiOperation({ summary: 'Update an order' })
  @ApiOkResponse({ description: 'Order updated successfully.' })
  @ApiParam({ name: 'orderID', type: 'number' })
  @TransformResponse(OrderAdminResponseDto)
  @NotFoundExceptionResponse()
  async ordersUpdate(
    @Param('orderID') orderID: number,
    @Body() body: OrderUpdateDto,
  ) {
    return this.ordersService.updateStatus(orderID, body);
  }

  @Delete('orders/:orderID')
  @ApiOperation({ summary: 'Delete an order' })
  @ApiOkResponse({ description: 'Order deleted successfully.' })
  @ApiParam({ name: 'orderID', type: 'number' })
  async ordersDelete(@Param('orderID') orderID: number) {
    return this.ordersService.delete(orderID);
  }

  @Get('users')
  @ApiOperation({ summary: 'Paginate list of users' })
  @ApiOkResponse({ description: 'Paginated list of users.' })
  @TransformResponse(UserDto)
  @PaginatedSwaggerDocs(UserDto, usersPaginateConfig)
  async usersPaginate(@Paginate() query: PaginateQuery) {
    return this.usersService.paginate(query);
  }

  @Get('users/stats')
  @ApiOperation({ summary: 'Get stats' })
  @ApiOkResponse({
    description: 'Stats retrieved successfully.',
    type: UsersStats,
    isArray: true,
  })
  @TransformResponse(UsersStats)
  async usersStats() {
    return this.usersService.getStats();
  }

  @Get('users/:id')
  @TransformResponse(UserDto)
  @ApiOperation({ summary: 'Find user' })
  @ApiOkResponse({ description: 'User find successfully', type: UserDto })
  @NotFoundExceptionResponse()
  async userFondOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOneByID(id);
  }

  @Patch('users/:id')
  @TransformResponse(UserDto)
  @ApiOperation({ summary: 'Update user' })
  @ApiBody({ type: UserUpdateDto })
  @ApiOkResponse({ description: 'User updated successfully', type: UserDto })
  @NotFoundExceptionResponse()
  async updateUser(
    @User() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body() userProfileUpdateDto: UserUpdateDto,
  ) {
    return this.usersService.updateUserAdmin(user, id, userProfileUpdateDto);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({ description: 'User deleted successfully' })
  async deleteUser(
      @User() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    if (user.id === id) {
      throw new BadRequestException('You cannot delete your own user');
    }

    return this.usersService.deleteByID(id);
  }
}

import { ApiExcludeController, TransformResponse } from '../common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
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
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartCreateDto, CartDto, CartUpdateDto } from './cart.dto';
import { User } from '../auth/decorators';
import { UserEntity } from '../users';
import { MaxCartItems, MaxCartItemsGuard } from './guards';

@ApiExcludeController()
@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Find User Cart Items' })
  @ApiOkResponse({
    description: 'Cart items retrieved successfully',
    type: CartDto,
    isArray: true,
  })
  @TransformResponse(CartDto)
  find(@User() user: UserEntity) {
    return this.cartService.find(user.id);
  }

  @Post()
  @UseGuards(MaxCartItemsGuard)
  @MaxCartItems(1000)
  @ApiOperation({ summary: 'Add Item to Cart' })
  @ApiBody({ type: CartCreateDto })
  @ApiOkResponse({
    description: 'Item created successfully',
    type: CartDto,
  })
  @ApiBadRequestResponse({
    description: 'Exceeded maximum cart items limit',
  })
  @TransformResponse(CartDto)
  create(@User() user: UserEntity, @Body() item: CartCreateDto) {
    return this.cartService.create(user.id, item);
  }

  @Patch()
  @ApiOperation({ summary: 'Update Cart Items' })
  @ApiBody({ type: [CartUpdateDto] })
  @ApiOkResponse({
    description: 'Items updated successfully',
  })
  @ApiNotFoundResponse()
  @TransformResponse(CartDto)
  update(@User() user: UserEntity, @Body() updates: CartUpdateDto[]) {
    return this.cartService.update(user.id, ...updates);
  }

  @Delete('clear')
  @ApiOperation({ summary: 'Update Cart Items' })
  @ApiOkResponse({ description: 'Cart cleared successfully' })
  clear(@User() user: UserEntity) {
    return this.cartService.clear(user.id);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete Cart Item' })
  @ApiOkResponse({ description: 'Item deleted successfully' })
  delete(@User() user: UserEntity, @Param('uuid') uuid: string) {
    return this.cartService.delete(user.id, uuid);
  }
}

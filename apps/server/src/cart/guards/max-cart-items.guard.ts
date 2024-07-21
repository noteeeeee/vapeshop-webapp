import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  SetMetadata,
  applyDecorators,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CartService } from '../cart.service';

@Injectable()
export class MaxCartItemsGuard implements CanActivate {
  constructor(
    private readonly cartService: CartService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const maxCartItems = this.reflector.get<number>(
      'maxCartItems',
      context.getHandler(),
    );

    if (!maxCartItems) {
      return true; // No maximum limit specified, allow access
    }

    const { user } = context.switchToHttp().getRequest();

    const cartItemCount = await this.cartService.count(user.id);
    const totalItemsCount = cartItemCount + context.getArgs()[0].length;

    // Check if adding the new item(s) will exceed the maximum limit
    if (totalItemsCount > maxCartItems) {
      throw new BadRequestException(
        `Adding these items will exceed the maximum limit of ${maxCartItems} cart items.`,
      );
    }

    return true;
  }
}

export const MaxCartItems = (maxCartItems: number) => {
  return applyDecorators(SetMetadata('maxCartItems', maxCartItems));
};

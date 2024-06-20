import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserContext } from './users.types';

@Injectable()
export class UsersMiddleware {
  constructor(private usersService: UsersService) {}

  async register(ctx: UserContext, next: Function): Promise<void> {
    ctx.user = await this.usersService.createOrUpdate(ctx.from.id, {
      username: ctx.from.username,
      firstName: ctx.from.first_name,
      isActive: true,
    });

    next(ctx);
  }
}

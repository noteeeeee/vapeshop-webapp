import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserContext } from './users.types';

@Injectable()
export class UsersMiddleware {
  constructor(private usersService: UsersService) {}

  private async getReferrerID(ctx: UserContext): Promise<number | undefined> {
    if (!('text' in ctx.message)) return undefined;
    const match = ctx.message.text.match(/\/start r_(\d+)/);

    const referrerID = Number(match[1]);
    if (!referrerID || referrerID == ctx.from.id) return undefined;

    const referrer = await this.usersService.findOneByID(referrerID);
    if (!referrer) return undefined;

    return referrerID;
  }

  async register(ctx: UserContext, next: Function): Promise<void> {
    const referrerID = await this.getReferrerID(ctx);

    ctx.user = await this.usersService.createOrUpdate(ctx.from.id, {
      username: ctx.from.username,
      firstName: ctx.from.first_name,
      isActive: true,
      referrerID,
    });

    next(ctx);
  }
}

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UserEntity } from '../../users';

@Injectable()
export class IsAdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user as UserEntity;

    if (!user?.isAdmin) throw new ForbiddenException();

    return true;
  }
}

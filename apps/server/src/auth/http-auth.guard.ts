import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/publc.decorator';

@Injectable()
export class HttpAuthGuard extends AuthGuard('webapp') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const type = context.getType();

    // // Check if the context is HTTP/HTTPS
    if (type == 'http') {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) return true;

      return super.canActivate(context);
    }

    return true;
  }
}

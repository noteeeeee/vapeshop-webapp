import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class HttpAuthGuard extends AuthGuard('webapp') {
  canActivate(context: ExecutionContext) {
    const type = context.getType();

    // // Check if the context is HTTP/HTTPS
    if (type == 'http') {
      return super.canActivate(context);
    }

    return true;
  }
}

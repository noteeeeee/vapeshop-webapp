import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';

@Catch()
export class VoidExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const regex = /at .*\.canActivate .*$/gm;
    const stack = exception?.stack?.toString();
    const stackTraceMatch = stack?.match(regex);

    if (!stackTraceMatch) {
      this.logger.error(exception);
    }
  }
}

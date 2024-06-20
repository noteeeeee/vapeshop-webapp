import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Type,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { Paginated } from 'nestjs-paginate';
import { CursorPaginated } from '../../cursor-paginate';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, any>
{
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dtos = this.reflector.get<Type<any>[] | undefined>(
      'transformResponse',
      context.getHandler(),
    );
    if (!dtos) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data: T | T[]) => {
        if (data instanceof Paginated || data instanceof CursorPaginated) {
          data.data = this.transformData(data.data, dtos);
        } else if (Array.isArray(data)) {
          data = data.map((item) => this.transform(item, dtos));
        } else {
          data = this.transform(data, dtos);
        }

        return data;
      }),
    );
  }

  private transform(data: T, dtos: Type<any>[]): any {
    for (const dto of dtos) {
      data = new dto(data);
    }
    return data;
  }

  private transformData(data: T[], dtos: Type<any>[]): T[] {
    return data.map((item) => this.transform(item, dtos));
  }
}

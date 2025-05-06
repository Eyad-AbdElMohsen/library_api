import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CustomMessageInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const target = request.query.target;
        const id = request.params.id;
        const message = target == 'users' ?
            `Books for this User with id ${id} are: ` :
            `Users for this Book with id ${id} are: `
        return next.handle().pipe(
            map((data) => ({
                message,
                data
            }))
        );
    }
}
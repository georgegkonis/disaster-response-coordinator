import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Message, MessageService } from 'primeng/api';
import { ServerError } from '../errors/server.error';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private messageService: MessageService
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                const serverError = error.error as ServerError;

                if (serverError.additionalInfo && serverError.additionalInfo.length > 0) {
                    const messages: Message[] = serverError.additionalInfo.map((info: string) => ({
                        severity: 'error',
                        summary: 'Error',
                        detail: info
                    }));
                    this.messageService.addAll(messages);
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: serverError.message
                    });
                }
                return throwError(() => error);
            })
        );
    }
}
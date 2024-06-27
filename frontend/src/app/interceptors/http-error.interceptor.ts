import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Message, MessageService } from 'primeng/api';
import { ServerError } from '../errors/server.error';
import { AppLoaderService } from '../services/app-loader.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private messageService: MessageService,
        private loaderService: AppLoaderService
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                const serverError = error.error as ServerError;

                if (serverError.additionalInfo && serverError.additionalInfo.length > 0) {
                    let messages: Message[] = serverError.additionalInfo.map((info: string) => {
                        return {
                            severity: 'error',
                            summary: 'Error',
                            detail: info
                        };
                    });
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
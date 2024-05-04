import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthActions } from './app.actions';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginRequest } from '../dto/requests/login-request.dto';
import { LoginResponse } from '../dto/responses/login-response.dto';
import { RegisterRequest } from '../dto/requests/register-request.dto';

@Injectable()
export class AppEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private messageService: MessageService,
        private router: Router
    ) {}

    login$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.login),
        mergeMap((payload: LoginRequest) =>
            this.authService.login(payload).pipe(
                map((response: LoginResponse) => {
                    this.showSuccessMessage('Login successful');
                    this.router.navigate(['/dashboard']).then();
                    return AuthActions.loginSuccess(response);
                }),
                catchError(() => of(AuthActions.loginFailure()))
            )
        )
    ));

    register$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.register),
        mergeMap((payload: RegisterRequest) =>
            this.authService.register(payload).pipe(
                map(() => {
                    this.showSuccessMessage('Registration successful');
                    this.router.navigate(['/login']).then();
                    return AuthActions.registerSuccess();
                }),
                catchError(() => of(AuthActions.registerFailure()))
            )
        )
    ));

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.logout),
        mergeMap(() =>
            this.authService.logout().pipe(
                map(() => {
                    this.showSuccessMessage('Logout successful');
                    this.router.navigate(['/']).then();
                    return AuthActions.logoutSuccess();
                }),
                catchError(() => of(AuthActions.logoutFailure()))
            )
        )
    ));

    private showSuccessMessage(message: string): void {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    }
}

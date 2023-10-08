import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthActions } from './app.actions';
import { LoginRequest, RegisterRequest } from '../models/requests.model';
import { MessageService } from 'primeng/api';
import { LoginResponse } from '../models/responses.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private messageService: MessageService,
        private router: Router
    ) {}

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            mergeMap((payload: LoginRequest) =>
                this.authService.login(payload).pipe(
                    map((response: LoginResponse) => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful' });
                        this.router.navigate(['/profile']).then();
                        return AuthActions.loginSuccess({ token: response.token });
                    }),
                    catchError(() => of(AuthActions.loginFailure()))
                )
            )
        )
    );

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.register),
            mergeMap((payload: RegisterRequest) =>
                this.authService.register(payload).pipe(
                    map(() => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration successful' });
                        this.router.navigate(['/login']).then();
                        return AuthActions.registerSuccess();
                    }),
                    catchError(() => of(AuthActions.registerFailure()))
                )
            )
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            mergeMap(() =>
                this.authService.logout().pipe(
                    map(() => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logout successful' });
                        this.router.navigate(['/']).then();
                        return AuthActions.logoutSuccess();
                    }),
                    catchError(() => of(AuthActions.logoutFailure()))
                )
            )
        )
    );
}

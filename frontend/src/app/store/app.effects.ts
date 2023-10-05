// auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthActions } from './app.actions';
import { LoginRequest, RegisterRequest } from '../models/requests.model';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) {}

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            mergeMap((payload: LoginRequest) =>
                this.authService.login(payload).pipe(
                    map(token => AuthActions.loginSuccess({ token })),
                    catchError(error => of(AuthActions.loginFailure({ error })))
                )
            )
        )
    );

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.register),
            mergeMap((payload: RegisterRequest) =>
                this.authService.register(payload).pipe(
                    map(() => AuthActions.registerSuccess()),
                    catchError(error => of(AuthActions.registerFailure({ error })))
                )
            )
        )
    );

}

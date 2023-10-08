import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthActions, MessageActions } from './app.actions';
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
                    map(payload => AuthActions.loginSuccess()),
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
                    map(() => AuthActions.registerSuccess()),
                    catchError(() => of(AuthActions.registerFailure()))
                )
            )
        )
    );

    successMessageEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
            map(() => MessageActions.set({ severity: 'success', summary: 'Success' }))
        )
    );

    failureMessageEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginFailure, AuthActions.registerFailure),
            map(() => MessageActions.set({ severity: 'error', summary: 'Error' }))
        )
    );
}

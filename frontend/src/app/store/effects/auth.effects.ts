import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NavigationService } from '../../services/navigation.service';
import { AuthActions } from '../actions/auth.actions';
import { AppMessageService } from '../../services/app-message.service';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private messageService: AppMessageService,
        private navigationService: NavigationService
    ) {}

    login$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.login),
        mergeMap(({ request }) =>
            this.authService.login(request).pipe(
                tap(() => {
                    this.messageService.showSuccess('Logged in successfully');
                    this.navigationService.navigateToDashboard();
                }),
                map(() => AuthActions.loginSuccess()),
                catchError(() => of(AuthActions.loginFailure()))
            )
        )
    ));

    register$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.register),
        mergeMap(({ request }) =>
            this.authService.register(request).pipe(
                tap(() => {
                    this.messageService.showSuccess('Registered successfully. Please login to continue');
                    this.navigationService.navigateToLogin();
                }),
                map(() => AuthActions.registerSuccess()),
                catchError(() => of(AuthActions.registerFailure()))
            )
        )
    ));

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.logout),
        mergeMap(() =>
            this.authService.logout().pipe(
                tap(() => {
                    this.messageService.showSuccess('Logged out successfully');
                    this.navigationService.navigateToHome();
                }),
                map(() => AuthActions.logoutSuccess()),
                catchError(() => of(AuthActions.logoutFailure()))
            )
        )
    ));
}

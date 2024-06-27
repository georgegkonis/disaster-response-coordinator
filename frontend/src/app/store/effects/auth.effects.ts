import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NavigationService } from '../../services/navigation.service';
import { AuthActions } from '../actions/auth.actions';
import { AppMessageService } from '../../services/app-message.service';
import { AppLoaderService } from '../../services/app-loader.service';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private loaderService: AppLoaderService,
        private messageService: AppMessageService,
        private navigationService: NavigationService
    ) {}

    loginEffect$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.login),
        tap(() => this.loaderService.show()),
        mergeMap(({ request }) => this.authService.login(request).pipe(
            tap(() => {
                this.messageService.showSuccess('Logged in successfully');
                this.navigationService.navigateToDashboard();
            }),
            map(() => AuthActions.loginSuccess()),
            catchError(() => of(AuthActions.loginFailure()))
        )),
        tap(() => this.loaderService.hide())
    ));

    registerEffect$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.register),
        tap(() => this.loaderService.show()),
        mergeMap(({ request }) => this.authService.register(request).pipe(
            tap(() => {
                this.messageService.showSuccess('Registered successfully. Please login to continue');
                this.navigationService.navigateToLogin();
            }),
            map(() => AuthActions.registerSuccess()),
            catchError(() => of(AuthActions.registerFailure()))
        )),
        tap(() => this.loaderService.hide())
    ));

    logoutEffect$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => this.loaderService.show()),
        mergeMap(() => this.authService.logout().pipe(
            tap(() => {
                this.messageService.showSuccess('Logged out successfully');
                this.navigationService.navigateToHome();
            }),
            map(() => AuthActions.logoutSuccess()),
            catchError(() => of(AuthActions.logoutFailure()))
        )),
        tap(() => this.loaderService.hide())
    ));
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { NavigationService } from '../../services/navigation.service';
import { AuthActions } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private messageService: MessageService,
        private navigationService: NavigationService
    ) {}

    login$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.login),
        mergeMap(({ request }) =>
            this.authService.login(request).pipe(
                map(() => {
                    this.showSuccessMessage('Login successful');
                    this.navigationService.navigateToDashboard();
                    return AuthActions.loginSuccess();
                }),
                catchError(() => of(AuthActions.loginFailure()))
            )
        )
    ));

    register$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.register),
        mergeMap(({ request }) =>
            this.authService.register(request).pipe(
                map(() => {
                    this.showSuccessMessage('Registration successful');
                    this.navigationService.navigateToLogin();
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
                    this.navigationService.navigateToHome();
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

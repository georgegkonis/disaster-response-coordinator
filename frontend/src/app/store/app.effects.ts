import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthActions } from './app.actions';
import { MessageService } from 'primeng/api';
import { LoginRequest } from '../dto/requests/login-request.dto';
import { RegisterRequest } from '../dto/requests/register-request.dto';
import { NavigationService } from '../services/navigation.service';

@Injectable()
export class AppEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private messageService: MessageService,
        private navigationService: NavigationService
    ) {}

    login$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.login),
        mergeMap((payload: LoginRequest) =>
            this.authService.login(payload).pipe(
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
        mergeMap((payload: RegisterRequest) =>
            this.authService.register(payload).pipe(
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

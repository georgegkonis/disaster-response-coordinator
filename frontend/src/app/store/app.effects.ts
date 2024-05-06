import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthActions, UserActions } from './app.actions';
import { MessageService } from 'primeng/api';
import { NavigationService } from '../services/navigation.service';
import { UserService } from '../services/user.service';

@Injectable()
export class AppEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private userService: UserService,
        private messageService: MessageService,
        private navigationService: NavigationService
    ) {}

    //#region Auth Effects

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

    //#endregion

    //#region User Effects

    getMe$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.getMe),
        mergeMap(() =>
            this.userService.getMe().pipe(
                map(user => UserActions.getMeSuccess({ user })),
                catchError(() => of(UserActions.getMeFailure()))
            )
        )
    ));

    updateMe$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.updateMe),
        mergeMap(({ request }) =>
            this.userService.updateMe(request).pipe(
                map((user) => {
                    this.showSuccessMessage('Account updated successfully');
                    return UserActions.updateMeSuccess({ user });
                }),
                catchError(() => of(UserActions.updateMeFailure()))
            )
        )
    ));

    //#endregion

    private showSuccessMessage(message: string): void {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    }
}

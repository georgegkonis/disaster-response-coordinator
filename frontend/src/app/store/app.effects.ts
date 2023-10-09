import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthActions, UserActions } from './app.actions';
import { LoginRequest, RegisterRequest, UpdateUserRequest } from '../models/requests.model';
import { MessageService } from 'primeng/api';
import { GetUsersResponse, LoginResponse } from '../models/responses.model';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable()
export class AppEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private userService: UserService,
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
                        this.router.navigate(['/dashboard']).then();
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

    getAllUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.getAll),
            mergeMap(() =>
                this.userService.getAll().pipe(
                    map((response: GetUsersResponse) => UserActions.getAllSuccess(response)),
                    catchError(() => of(UserActions.getAllFailure()))
                )
            )
        )
    );

    getCurrentUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.getCurrent),
            mergeMap(() =>
                this.userService.getCurrent().pipe(
                    map((user: User) => UserActions.getCurrentSuccess(user)),
                    catchError(() => of(UserActions.getCurrentFailure()))
                )
            )
        )
    );

    updateCurrentUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.updateCurrent),
            mergeMap((request: UpdateUserRequest) =>
                this.userService.updateCurrent(request).pipe(
                    map((user: User) => {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile updated' });
                            return UserActions.updateCurrentSuccess(user);
                        }
                    ),
                    catchError(() => of(UserActions.updateCurrentFailure()))
                )
            )
        )
    );
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthActions, CategoryActions, ProductActions, ComStoreActions, UserActions } from './app.actions';
import { LoginRequest, RegisterRequest, UpdateUserRequest } from '../models/requests.model';
import { MessageService } from 'primeng/api';
import { GetUsersResponse, LoginResponse } from '../models/responses.model';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { StoreService } from '../services/store.service';

@Injectable()
export class AppEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private userService: UserService,
        private messageService: MessageService,
        private productService: ProductService,
        private categoryService: CategoryService,
        private storeService: StoreService,
        private router: Router
    ) {}

    login$ = createEffect(() =>
        this.actions$.pipe(
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

    register$ = createEffect(() =>
        this.actions$.pipe(
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

    logout$ = createEffect(() =>
        this.actions$.pipe(
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

    getAllUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.getAll),
            mergeMap(() =>
                this.userService.getAll().pipe(
                    map((response: GetUsersResponse) => UserActions.getAllSuccess(response)),
                    catchError(() => of(UserActions.getAllFailure()))
                )
            )
        ));

    getCurrentUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.getCurrent),
            mergeMap(() =>
                this.userService.getCurrent().pipe(
                    map((user: User) => UserActions.getCurrentSuccess(user)),
                    catchError(() => of(UserActions.getCurrentFailure()))
                )
            )
        ));

    updateCurrentUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.updateCurrent),
            mergeMap((request: UpdateUserRequest) =>
                this.userService.updateCurrent(request).pipe(
                    map((user: User) => {
                            this.showSuccessMessage('User updated');
                            return UserActions.updateCurrentSuccess(user);
                        }
                    ),
                    catchError(() => of(UserActions.updateCurrentFailure()))
                )
            )
        ));

    deleteAllProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.deleteAll),
            mergeMap(() =>
                this.productService.deleteAll().pipe(
                    map(() => {
                            this.showSuccessMessage('All products deleted');
                            return ProductActions.deleteAllSuccess();
                        }
                    ),
                    catchError(() => of(ProductActions.deleteAllFailure()))
                )
            )
        ));

    deleteAllCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoryActions.deleteAll),
            mergeMap(() =>
                this.categoryService.deleteAll().pipe(
                    map(() => {
                            this.showSuccessMessage('All categories deleted');
                            return CategoryActions.deleteAllSuccess();
                        }
                    ),
                    catchError(() => of(CategoryActions.deleteAllFailure()))
                )
            )
        ));

    deleteAllStores$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ComStoreActions.deleteAll),
            mergeMap(() =>
                this.storeService.deleteAll().pipe(
                    map(() => {
                            this.showSuccessMessage('All stores deleted');
                            return ComStoreActions.deleteAllSuccess();
                        }
                    ),
                    catchError(() => of(ComStoreActions.deleteAllFailure()))
                )
            )
        ));

    getAllStores$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ComStoreActions.getAll),
            mergeMap((request) =>
                this.storeService.getAll(request.name, request.categoryId).pipe(
                    map((stores) => ComStoreActions.getAllSuccess({ stores })),
                    catchError(() => of(ComStoreActions.getAllFailure()))
                )
            )
        ));

    getAllCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoryActions.getAll),
            mergeMap(() =>
                this.categoryService.getAll().pipe(
                    map((categories) => CategoryActions.getAllSuccess({ categories })),
                    catchError(() => of(CategoryActions.getAllFailure()))
                )
            )
        ));

    private showSuccessMessage(message: string): void {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    }
}

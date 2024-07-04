import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserActions } from '../actions/user.actions';
import { UserService } from '../../services/user.service';
import { Injectable } from '@angular/core';
import { AppMessageService } from '../../services/app-message.service';
import { AppLoaderService } from '../../services/app-loader.service';
import { withMinDelay } from '../../utilities/with-min-delay';
import { NavigationService } from '../../services/navigation.service';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private messageService: AppMessageService,
        private loaderService: AppLoaderService,
        private navigationService: NavigationService
    ) {}

    loadEffect$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.load),
        tap(() => this.loaderService.show()),
        mergeMap(({ role }) => withMinDelay(this.userService.find(role)).pipe(
            map(users => UserActions.loadSuccess({ users })),
            catchError(() => of(UserActions.loadFailure()))
        )),
        tap(() => this.loaderService.hide())
    ));

    createEffect$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.create),
        mergeMap(({ request }) => this.userService.create(request).pipe(
            map(user => UserActions.createSuccess({ user })),
            tap(() => this.messageService.showSuccess('User created successfully')),
            catchError(() => of(UserActions.createFailure()))
        ))
    ));

    deleteEffect$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.$delete),
        mergeMap(({ id }) => this.userService.delete(id).pipe(
            map(() => UserActions.deleteSuccess({ id })),
            tap(() => this.messageService.showSuccess('User deleted successfully')),
            catchError(() => of(UserActions.deleteFailure()))
        ))
    ));

    loadMeEffect$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.loadMe),
        mergeMap(() => withMinDelay(this.userService.getMe()).pipe(
            map(user => UserActions.loadMeSuccess({ user })),
            catchError(() => of(UserActions.loadMeFailure()))
        ))
    ));

    updateMeEffect$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.updateMe),
        mergeMap(({ request }) => this.userService.updateMe(request).pipe(
            map(user => UserActions.updateMeSuccess({ user })),
            tap(() => {
                this.messageService.showSuccess('User updated successfully');
                this.navigationService.navigateToDashboard();
            }),
            catchError(() => of(UserActions.updateMeFailure()))
        ))
    ));

    updateMyLocationEffect$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.updateMyLocation),
        mergeMap(({ location }) => this.userService.updateMyLocation(location).pipe(
            map(() => UserActions.updateMyLocationSuccess({ location })),
            catchError(() => of(UserActions.updateMyLocationFailure()))
        ))
    ));

    updateMyInventoryEffect$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.updateMyInventory),
        mergeMap(({ item, quantity }) => this.userService.updateMyInventory(item, quantity).pipe(
            tap(() => this.messageService.showSuccess('Inventory updated successfully')),
            map((user) => UserActions.updateMyInventorySuccess({ user })),
            catchError(() => of(UserActions.updateMyInventoryFailure()))
        ))
    ));
}
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserActions } from '../actions/user.actions';
import { UserService } from '../../services/user.service';
import { Injectable } from '@angular/core';
import { AppMessageService } from '../../services/app-message.service';
import { AppLoaderService } from '../../services/app-loader.service';
import { withMinDelay } from '../../utilities/with-min-delay';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private messageService: AppMessageService,
        private loaderService: AppLoaderService
    ) {}

    loadEffect$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.load),
        tap(() => this.loaderService.show()),
        mergeMap(() => withMinDelay(this.userService.find()).pipe(
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
            tap(() => this.messageService.showSuccess('User updated successfully')),
            catchError(() => of(UserActions.updateMeFailure()))
        ))
    ));

    updateUserLocationEffect$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.updateLocation),
        mergeMap(({ location }) => this.userService.updateMyLocation(location).pipe(
            map(() => UserActions.updateLocationSuccess({ location })),
            catchError(() => of(UserActions.updateLocationFailure()))
        ))
    ));

    reloadEffect$ = createEffect(() => this.actions$.pipe(
        ofType(
            UserActions.createSuccess,
            UserActions.deleteSuccess,
            UserActions.updateMeSuccess
        ),
        map(() => UserActions.load())
    ));
}
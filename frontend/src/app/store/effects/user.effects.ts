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
            tap(() => this.loaderService.hide()),
            catchError(() => of(UserActions.loadFailure()))
        ))
    ));

    createEffect$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.create),
        mergeMap(({ request }) => this.userService.create(request).pipe(
            map(user => UserActions.createSuccess({ user })),
            tap(() => this.messageService.showSuccess('User created successfully')),
            catchError(() => of(UserActions.createFailure()))
        ))
    ));

    removeEffect$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.remove),
        mergeMap(({ id }) => this.userService.delete(id).pipe(
            map(() => UserActions.removeSuccess({ id })),
            tap(() => this.messageService.showSuccess('User deleted successfully')),
            catchError(() => of(UserActions.removeFailure()))
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

    reloadEffect$ = createEffect(() => this.actions$.pipe(
        ofType(
            UserActions.createSuccess,
            UserActions.removeSuccess,
            UserActions.updateMeSuccess
        ),
        map(() => UserActions.load())
    ));
}
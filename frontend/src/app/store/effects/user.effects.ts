import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserActions } from '../actions/user.actions';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private messageService: MessageService
    ) {}

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

    private showSuccessMessage(message: string): void {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    }
}
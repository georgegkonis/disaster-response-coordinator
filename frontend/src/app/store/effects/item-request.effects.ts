import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemRequestService } from '../../services/item-request.service';
import { AppLoaderService } from '../../services/app-loader.service';
import { AppMessageService } from '../../services/app-message.service';
import { finalize, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ItemRequestActions } from '../actions/item-request.actions';
import { withMinDelay } from '../../utilities/with-min-delay';

@Injectable()
export class ItemRequestEffects {

    constructor(
        private actions$: Actions,
        private itemRequestService: ItemRequestService,
        private messageService: AppMessageService,
        private loaderService: AppLoaderService
    ) {}

    loadEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemRequestActions.load),
        tap(() => this.loaderService.show()),
        mergeMap(() => withMinDelay(this.itemRequestService.find()).pipe(
            map((itemRequests) => ItemRequestActions.loadSuccess({ itemRequests })),
            catchError(() => of(ItemRequestActions.loadFailure()))
        )),
        finalize(() => this.loaderService.hide())
    ));

    loadMineEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemRequestActions.loadMine),
        tap(() => this.loaderService.show()),
        mergeMap(() => withMinDelay(this.itemRequestService.findMine()).pipe(
            map((itemRequests) => ItemRequestActions.loadMySuccess({ itemRequests })),
            catchError(() => of(ItemRequestActions.loadMyFailure()))
        )),
        finalize(() => this.loaderService.hide())
    ));

    createEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemRequestActions.create),
        mergeMap(({ request }) => this.itemRequestService.create(request).pipe(
            map((itemRequest) => ItemRequestActions.createSuccess({ itemRequest })),
            tap(() => this.messageService.showSuccess('Item request created successfully')),
            catchError(() => of(ItemRequestActions.createFailure()))
        ))
    ));

    updateStatusEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemRequestActions.updateStatus),
        mergeMap(({ id, status }) => this.itemRequestService.updateStatus(id, status).pipe(
            map((itemRequest) => ItemRequestActions.updateStatusSuccess({ itemRequest })),
            tap(() => this.messageService.showSuccess('Item request status updated successfully')),
            catchError(() => of(ItemRequestActions.updateStatusFailure()))
        ))
    ));

    deleteEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemRequestActions.$delete),
        mergeMap(({ id }) => this.itemRequestService.delete(id).pipe(
            map(() => ItemRequestActions.deleteSuccess({ id })),
            tap(() => this.messageService.showSuccess('Item request deleted successfully')),
            catchError(() => of(ItemRequestActions.deleteFailure()))
        ))
    ));
}

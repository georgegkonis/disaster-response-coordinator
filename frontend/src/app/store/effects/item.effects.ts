import { Injectable } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemActions } from '../actions/item.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { WarehouseActions } from '../actions/warehouse.actions';

@Injectable()
export class ItemEffects {

    constructor(
        private actions$: Actions,
        private itemService: ItemService
    ) {}

    loadItemsEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemActions.load),
        mergeMap(({ request }) => this.itemService.find(request).pipe(
            map((items) => ItemActions.loadSuccess({ items })),
            catchError(() => of(ItemActions.loadFailure()))
        ))
    ));

    createItemEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemActions.create),
        mergeMap(({ request }) => this.itemService.create(request).pipe(
            map((item) => ItemActions.createSuccess({ item })),
            catchError(() => of(ItemActions.createFailure()))
        ))
    ));

    updateItemEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemActions.update),
        mergeMap(({ id, request }) => this.itemService.update(id, request).pipe(
            map((item) => ItemActions.updateSuccess({ item })),
            catchError(() => of(ItemActions.updateFailure()))
        ))
    ));

    removeItemEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemActions.remove),
        mergeMap(({ id }) => this.itemService.remove(id).pipe(
            map(() => ItemActions.removeSuccess({ id })),
            catchError(() => of(ItemActions.removeFailure()))
        ))
    ));

    removeItemsEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemActions.removeMany),
        mergeMap(({ request }) => this.itemService.removeMany(request).pipe(
            map(() => ItemActions.removeManySuccess({ ids: request.ids })),
            catchError(() => of(ItemActions.removeManyFailure()))
        ))
    ));

    reloadItemsEffect$ = createEffect(() => this.actions$.pipe(
        ofType(
            ItemActions.createSuccess,
            ItemActions.updateSuccess,
            ItemActions.removeSuccess,
            ItemActions.removeManySuccess,
            WarehouseActions.clearDataSuccess,
            WarehouseActions.importDataSuccess
        ),
        map(() => ItemActions.load({ request: {} }))
    ));
}


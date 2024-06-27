import { Injectable } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemActions } from '../actions/item.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { WarehouseActions } from '../actions/warehouse.actions';
import { AppMessageService } from '../../services/app-message.service';
import { AppLoaderService } from '../../services/app-loader.service';
import { withMinDelay } from '../../utilities/with-min-delay';

@Injectable()
export class ItemEffects {

    constructor(
        private actions$: Actions,
        private itemService: ItemService,
        private messageService: AppMessageService,
        private loaderService: AppLoaderService
    ) {}

    loadEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemActions.load),
        tap(() => this.loaderService.show()),
        mergeMap(({ request }) => withMinDelay(this.itemService.find(request)).pipe(
            map((items) => ItemActions.loadSuccess({ items })),
            catchError(() => of(ItemActions.loadFailure()))
        )),
        tap(() => this.loaderService.hide())
    ));

    createEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemActions.create),
        mergeMap(({ request }) => this.itemService.create(request).pipe(
            map((item) => ItemActions.createSuccess({ item })),
            tap(() => this.messageService.showSuccess('Item created successfully')),
            catchError(() => of(ItemActions.createFailure()))
        ))
    ));

    updateEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemActions.update),
        mergeMap(({ id, request }) => this.itemService.update(id, request).pipe(
            map((item) => ItemActions.updateSuccess({ item })),
            tap(() => this.messageService.showSuccess('Item updated successfully')),
            catchError(() => of(ItemActions.updateFailure()))
        ))
    ));

    deleteEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemActions.$delete),
        mergeMap(({ id }) => this.itemService.delete(id).pipe(
            map(() => ItemActions.deleteSuccess({ id })),
            tap(() => this.messageService.showSuccess('Item deleted successfully')),
            catchError(() => of(ItemActions.deleteFailure()))
        ))
    ));

    deleteManyEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemActions.deleteMany),
        mergeMap(({ ids }) => this.itemService.deleteMany(ids).pipe(
            map(() => ItemActions.deleteManySuccess({ ids })),
            tap(() => this.messageService.showSuccess('Items deleted successfully')),
            catchError(() => of(ItemActions.deleteManyFailure()))
        ))
    ));

    reloadItemsEffect$ = createEffect(() => this.actions$.pipe(
        ofType(
            ItemActions.createSuccess,
            ItemActions.updateSuccess,
            ItemActions.deleteSuccess,
            ItemActions.deleteManySuccess,
            WarehouseActions.clearDataSuccess,
            WarehouseActions.importDataSuccess
        ),
        map(() => ItemActions.load({ request: {} }))
    ));
}


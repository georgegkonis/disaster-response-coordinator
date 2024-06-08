import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CategoryActions, ItemActions, WarehouseActions } from '../actions/warehouse.actions';
import { WarehouseService } from '../../services/warehouse.service';
import { Injectable } from '@angular/core';

@Injectable()
export class WarehouseEffects {

    constructor(
        private actions$: Actions,
        private warehouseService: WarehouseService
    ) {}

    uploadEffect$ = createEffect(() => this.actions$.pipe(
        ofType(WarehouseActions.upload),
        mergeMap(({ file }) => this.warehouseService.upload(file).pipe(
            map(() => WarehouseActions.uploadSuccess()),
            catchError(() => of(WarehouseActions.uploadFailure()))
        ))
    ));

    clearEffect$ = createEffect(() => this.actions$.pipe(
        ofType(WarehouseActions.clear),
        mergeMap(() => this.warehouseService.deleteAll().pipe(
            map(() => WarehouseActions.clearSuccess()),
            catchError(() => of(WarehouseActions.clearFailure()))
        ))
    ));

    //#region Category Effects

    loadCategoriesEffect$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.load),
        mergeMap(({ request }) => this.warehouseService.getCategories(request).pipe(
            map((categories) => CategoryActions.loadSuccess({ categories })),
            catchError(() => of(CategoryActions.loadFailure()))
        ))
    ));

    createCategoryEffect$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.create),
        mergeMap(({ request }) => this.warehouseService.createCategory(request).pipe(
            map((category) => CategoryActions.createSuccess({ category })),
            catchError(() => of(CategoryActions.createFailure()))
        ))
    ));

    updateCategoryEffect$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.update),
        mergeMap(({ id, request }) => this.warehouseService.updateCategory(id, request).pipe(
            map((category) => CategoryActions.updateSuccess({ category })),
            catchError(() => of(CategoryActions.updateFailure()))
        ))
    ));

    removeCategoryEffect$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.remove),
        mergeMap(({ id }) => this.warehouseService.removeCategory(id).pipe(
            map(() => CategoryActions.removeSuccess({ id })),
            catchError(() => of(CategoryActions.removeFailure()))
        ))
    ));

    removeCategoriesEffect$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.removeMany),
        mergeMap(({ request }) => this.warehouseService.removeCategories(request).pipe(
            map(() => CategoryActions.removeManySuccess({ ids: request.ids })),
            catchError(() => of(CategoryActions.removeManyFailure()))
        ))
    ));

    reloadCategoriesEffect$ = createEffect(() => this.actions$.pipe(
        ofType(
            CategoryActions.createSuccess,
            CategoryActions.removeSuccess,
            CategoryActions.removeManySuccess,
            WarehouseActions.clearSuccess,
            WarehouseActions.uploadSuccess
        ),
        map(() => CategoryActions.load({ request: {} }))
    ));

    //#endregion

    //#region Item Effects

    loadItemsEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemActions.load),
        mergeMap(({ request }) => this.warehouseService.getItems(request).pipe(
            map((items) => ItemActions.loadSuccess({ items })),
            catchError(() => of(ItemActions.loadFailure()))
        ))
    ));

    createItemEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemActions.create),
        mergeMap(({ request }) => this.warehouseService.createItem(request).pipe(
            map((item) => ItemActions.createSuccess({ item })),
            catchError(() => of(ItemActions.createFailure()))
        ))
    ));

    updateItemEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemActions.update),
        mergeMap(({ id, request }) => this.warehouseService.updateItem(id, request).pipe(
            map((item) => ItemActions.updateSuccess({ item })),
            catchError(() => of(ItemActions.updateFailure()))
        ))
    ));

    removeItemEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemActions.remove),
        mergeMap(({ id }) => this.warehouseService.removeItem(id).pipe(
            map(() => ItemActions.removeSuccess({ id })),
            catchError(() => of(ItemActions.removeFailure()))
        ))
    ));

    removeItemsEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemActions.removeMany),
        mergeMap(({ request }) => this.warehouseService.removeItems(request).pipe(
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
            WarehouseActions.clearSuccess,
            WarehouseActions.uploadSuccess
        ),
        map(() => ItemActions.load({ request: {} }))
    ));

    //#endregion
}
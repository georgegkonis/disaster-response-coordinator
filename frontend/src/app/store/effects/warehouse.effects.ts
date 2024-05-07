import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { WarehouseActions } from '../actions/warehouse.actions';
import { WarehouseService } from '../../services/warehouse.service';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable()
export class WarehouseEffects {

    constructor(
        private actions$: Actions,
        private warehouseService: WarehouseService,
        private messageService: MessageService
    ) {}

    upload$ = createEffect(() => this.actions$.pipe(
        ofType(WarehouseActions.upload),
        mergeMap(({ file }) =>
            this.warehouseService.upload(file).pipe(
                map(() => {
                    this.showSuccessMessage('File uploaded successfully');
                    return WarehouseActions.uploadSuccess();
                }),
                catchError(() => of(WarehouseActions.uploadFailure()))
            )
        )
    ));

    createCategory$ = createEffect(() => this.actions$.pipe(
        ofType(WarehouseActions.createCategory),
        mergeMap(({ request }) =>
            this.warehouseService.createCategory(request).pipe(
                map((category) => {
                    this.showSuccessMessage('Category created successfully');
                    return WarehouseActions.createCategorySuccess({ category });
                }),
                catchError(() => of(WarehouseActions.createCategoryFailure()))
            )
        )
    ));

    createItem$ = createEffect(() => this.actions$.pipe(
        ofType(WarehouseActions.createItem),
        mergeMap(({ request }) =>
            this.warehouseService.createItem(request).pipe(
                map((item) => {
                    this.showSuccessMessage('Item created successfully');
                    return WarehouseActions.createItemSuccess({ item });
                }),
                catchError(() => of(WarehouseActions.createItemFailure()))
            )
        )
    ));

    getCategories$ = createEffect(() => this.actions$.pipe(
        ofType(WarehouseActions.getCategories),
        mergeMap(({ request }) =>
            this.warehouseService.getCategories(request).pipe(
                map((categories) => WarehouseActions.getCategoriesSuccess({ categories })),
                catchError(() => of(WarehouseActions.getCategoriesFailure()))
            )
        )
    ));

    getItems$ = createEffect(() => this.actions$.pipe(
        ofType(WarehouseActions.getItems),
        mergeMap(({ request }) =>
            this.warehouseService.getItems(request).pipe(
                map((items) => WarehouseActions.getItemsSuccess({ items })),
                catchError(() => of(WarehouseActions.getItemsFailure()))
            )
        )
    ));

    updateItemQuantity$ = createEffect(() => this.actions$.pipe(
        ofType(WarehouseActions.updateItemQuantity),
        mergeMap(({ itemId, request }) =>
            this.warehouseService.updateItemQuantity(itemId, request).pipe(
                map((item) => {
                    this.showSuccessMessage('Item quantity updated successfully');
                    return WarehouseActions.updateItemQuantitySuccess({ item });
                }),
                catchError(() => of(WarehouseActions.updateItemQuantityFailure()))
            )
        )
    ));

    deleteAll$ = createEffect(() => this.actions$.pipe(
        ofType(WarehouseActions.deleteAll),
        mergeMap(() =>
            this.warehouseService.deleteAll().pipe(
                map(() => {
                    this.showSuccessMessage('All categories and items deleted successfully');
                    return WarehouseActions.deleteAllSuccess();
                }),
                catchError(() => of(WarehouseActions.deleteAllFailure()))
            )
        )
    ));

    private showSuccessMessage(message: string): void {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    }
}
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { WarehouseActions } from '../actions/warehouse.actions';
import { WarehouseService } from '../../services/warehouse.service';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable()
export class WarehouseEffects {

    constructor(
        private actions$: Actions,
        private warehouseService: WarehouseService
    ) {}

    importDataEffect$ = createEffect(() => this.actions$.pipe(
        ofType(WarehouseActions.importData),
        mergeMap(({ file }) => this.warehouseService.importData(file).pipe(
            map(() => WarehouseActions.importDataSuccess()),
            catchError(() => of(WarehouseActions.importDataFailure()))
        ))
    ));

    exportDataEffect$ = createEffect(() => this.actions$.pipe(
        ofType(WarehouseActions.exportData),
        mergeMap(() => this.warehouseService.exportData().pipe(
            tap((data) => saveAs(data, 'warehouse.json')),
            map((data) => WarehouseActions.exportDataSuccess({ data })),
            catchError(() => of(WarehouseActions.exportDataFailure()))
        ))
    ));

    clearDataEffect$ = createEffect(() => this.actions$.pipe(
        ofType(WarehouseActions.clearData),
        mergeMap(() => this.warehouseService.clearData().pipe(
            map(() => WarehouseActions.clearDataSuccess()),
            catchError(() => of(WarehouseActions.clearDataFailure()))
        ))
    ));
}
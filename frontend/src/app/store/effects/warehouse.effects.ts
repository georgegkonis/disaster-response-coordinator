import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { WarehouseActions } from '../actions/warehouse.actions';
import { WarehouseService } from '../../services/warehouse.service';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { withMinDelay } from '../../utilities/with-min-delay';
import { AppLoaderService } from '../../services/app-loader.service';

@Injectable()
export class WarehouseEffects {

    constructor(
        private actions$: Actions,
        private warehouseService: WarehouseService,
        private loaderService: AppLoaderService
    ) {}

    importDataEffect$ = createEffect(() => this.actions$.pipe(
        ofType(WarehouseActions.importData),
        tap(() => this.loaderService.show()),
        mergeMap(({ file }) => withMinDelay(this.warehouseService.importData(file)).pipe(
            map(() => WarehouseActions.importDataSuccess()),
            catchError(() => of(WarehouseActions.importDataFailure()))
        )),
        tap(() => this.loaderService.hide())
    ));

    exportDataEffect$ = createEffect(() => this.actions$.pipe(
        ofType(WarehouseActions.exportData),
        tap(() => this.loaderService.show()),
        mergeMap(() => withMinDelay(this.warehouseService.exportData()).pipe(
            tap((data) => saveAs(data, 'warehouse_data.json')),
            map((data) => WarehouseActions.exportDataSuccess({ data })),
            catchError(() => of(WarehouseActions.exportDataFailure()))
        )),
        tap(() => this.loaderService.hide())
    ));

    clearDataEffect$ = createEffect(() => this.actions$.pipe(
        ofType(WarehouseActions.clearData),
        mergeMap(() => this.warehouseService.clearData().pipe(
            map(() => WarehouseActions.clearDataSuccess()),
            catchError(() => of(WarehouseActions.clearDataFailure()))
        ))
    ));
}
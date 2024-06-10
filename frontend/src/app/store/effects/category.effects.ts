import { Injectable } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { WarehouseActions } from '../actions/warehouse.actions';
import { CategoryActions } from '../actions/category.actions';

@Injectable()
export class CategoryEffects {

    constructor(
        private actions$: Actions,
        private categoryService: CategoryService
    ) {}

    loadEffect$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.load),
        mergeMap(({ request }) => this.categoryService.find(request).pipe(
            map((categories) => CategoryActions.loadSuccess({ categories })),
            catchError(() => of(CategoryActions.loadFailure()))
        ))
    ));

    createEffect$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.create),
        mergeMap(({ request }) => this.categoryService.create(request).pipe(
            map((category) => CategoryActions.createSuccess({ category })),
            catchError(() => of(CategoryActions.createFailure()))
        ))
    ));

    updateEffect$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.update),
        mergeMap(({ id, request }) => this.categoryService.update(id, request).pipe(
            map((category) => CategoryActions.updateSuccess({ category })),
            catchError(() => of(CategoryActions.updateFailure()))
        ))
    ));

    removeEffect$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.remove),
        mergeMap(({ id }) => this.categoryService.remove(id).pipe(
            map(() => CategoryActions.removeSuccess({ id })),
            catchError(() => of(CategoryActions.removeFailure()))
        ))
    ));

    removeManyEffect$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.removeMany),
        mergeMap(({ request }) => this.categoryService.removeMany(request).pipe(
            map(() => CategoryActions.removeManySuccess({ ids: request.ids })),
            catchError(() => of(CategoryActions.removeManyFailure()))
        ))
    ));

    reloadEffect$ = createEffect(() => this.actions$.pipe(
        ofType(
            CategoryActions.createSuccess,
            CategoryActions.removeSuccess,
            CategoryActions.removeManySuccess,
            WarehouseActions.clearDataSuccess,
            WarehouseActions.importDataSuccess
        ),
        map(() => CategoryActions.load({ request: {} }))
    ));
}
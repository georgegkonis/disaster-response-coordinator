import { Injectable } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { WarehouseActions } from '../actions/warehouse.actions';
import { CategoryActions } from '../actions/category.actions';
import { AppMessageService } from '../../services/app-message.service';
import { AppLoaderService } from '../../services/app-loader.service';
import { withMinDelay } from '../../utilities/with-min-delay';

@Injectable()
export class CategoryEffects {

    constructor(
        private actions$: Actions,
        private categoryService: CategoryService,
        private messageService: AppMessageService,
        private loaderService: AppLoaderService
    ) {}

    loadEffect$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.load),
        tap(() => this.loaderService.show()),
        mergeMap(({ request }) => withMinDelay(this.categoryService.find(request)).pipe(
            map((categories) => CategoryActions.loadSuccess({ categories })),
            tap(() => this.loaderService.hide()),
            catchError(() => of(CategoryActions.loadFailure()))
        ))
    ));

    createEffect$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.create),
        mergeMap(({ request }) => this.categoryService.create(request).pipe(
            map((category) => CategoryActions.createSuccess({ category })),
            tap(() => this.messageService.showSuccess('Category created successfully')),
            catchError(() => of(CategoryActions.createFailure()))
        ))
    ));

    updateEffect$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.update),
        mergeMap(({ id, request }) => this.categoryService.update(id, request).pipe(
            map((category) => CategoryActions.updateSuccess({ category })),
            tap(() => this.messageService.showSuccess('Category updated successfully')),
            catchError(() => of(CategoryActions.updateFailure()))
        ))
    ));

    removeEffect$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.remove),
        mergeMap(({ id }) => this.categoryService.remove(id).pipe(
            map(() => CategoryActions.removeSuccess({ id })),
            tap(() => this.messageService.showSuccess('Category removed successfully')),
            catchError(() => of(CategoryActions.removeFailure()))
        ))
    ));

    removeManyEffect$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.removeMany),
        mergeMap(({ request }) => this.categoryService.removeMany(request).pipe(
            map(() => CategoryActions.removeManySuccess({ ids: request.ids })),
            tap(() => this.messageService.showSuccess('Categories removed successfully')),
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
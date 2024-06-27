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
            catchError(() => of(CategoryActions.loadFailure()))
        )),
        tap(() => this.loaderService.hide())
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

    deleteEffect$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.$delete),
        mergeMap(({ id }) => this.categoryService.delete(id).pipe(
            map(() => CategoryActions.deleteSuccess({ id })),
            tap(() => this.messageService.showSuccess('Category deleted successfully')),
            catchError(() => of(CategoryActions.deleteFailure()))
        ))
    ));

    deleteManyEffect$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.deleteMany),
        mergeMap(({ ids }) => this.categoryService.deleteMany(ids).pipe(
            map(() => CategoryActions.deleteManySuccess({ ids })),
            tap(() => this.messageService.showSuccess('Categories deleted successfully')),
            catchError(() => of(CategoryActions.deleteManyFailure()))
        ))
    ));

    reloadEffect$ = createEffect(() => this.actions$.pipe(
        ofType(
            CategoryActions.createSuccess,
            CategoryActions.deleteSuccess,
            CategoryActions.deleteManySuccess,
            WarehouseActions.clearDataSuccess,
            WarehouseActions.importDataSuccess
        ),
        map(() => CategoryActions.load({ request: {} }))
    ));
}
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HeadquartersService } from '../../services/headquarters.service';
import { AppLoaderService } from '../../services/app-loader.service';
import { AppMessageService } from '../../services/app-message.service';
import { HeadquartersActions } from '../actions/headquarters.actions';
import { finalize, mergeMap, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class HeadquartersEffects {

    constructor(
        private actions$: Actions,
        private headquartersService: HeadquartersService,
        private loaderService: AppLoaderService,
        private messageService: AppMessageService
    ) {}

    loadEffect$ = createEffect(() => this.actions$.pipe(
        ofType(HeadquartersActions.load),
        tap(() => this.loaderService.show()),
        mergeMap(() => this.headquartersService.find().pipe(
            map((headquarters) => HeadquartersActions.loadSuccess({ headquarters })),
            catchError(() => of(HeadquartersActions.loadFailure()))
        )),
        finalize(() => this.loaderService.hide())
    ));

    createEffect$ = createEffect(() => this.actions$.pipe(
        ofType(HeadquartersActions.create),
        mergeMap(({ request }) => this.headquartersService.create(request).pipe(
            map((headquarters) => HeadquartersActions.createSuccess({ headquarters })),
            tap(() => this.messageService.showSuccess('Headquarters created successfully')),
            catchError(() => of(HeadquartersActions.createFailure()))
        ))
    ));

    deleteEffect$ = createEffect(() => this.actions$.pipe(
        ofType(HeadquartersActions.$delete),
        mergeMap(({ id }) => this.headquartersService.delete(id).pipe(
            map(() => HeadquartersActions.deleteSuccess({ id })),
            tap(() => this.messageService.showSuccess('Headquarters deleted successfully')),
            catchError(() => of(HeadquartersActions.deleteFailure()))
        ))
    ));
}
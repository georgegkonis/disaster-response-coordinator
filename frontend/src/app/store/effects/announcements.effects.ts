import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AnnouncementsService } from '../../services/announcements.service';
import { of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AnnouncementsActions } from '../actions/announcements.actions';

@Injectable()
export class AnnouncementsEffects {

    constructor(
        private actions$: Actions,
        private announcementsService: AnnouncementsService
    ) {}

    loadEffect$ = createEffect(() => this.actions$.pipe(
        ofType(AnnouncementsActions.load),
        switchMap(() => this.announcementsService.getAll().pipe(
            map(announcements => AnnouncementsActions.loadSuccess({ announcements })),
            catchError(() => of(AnnouncementsActions.loadFailure()))
        ))
    ));

    createEffect$ = createEffect(() => this.actions$.pipe(
        ofType(AnnouncementsActions.create),
        switchMap(({ request }) => this.announcementsService.create(request).pipe(
            map(announcement => AnnouncementsActions.createSuccess({ announcement })),
            catchError(() => of(AnnouncementsActions.createFailure()))
        ))
    ));

    removeEffect$ = createEffect(() => this.actions$.pipe(
        ofType(AnnouncementsActions.remove),
        switchMap(({ id }) => this.announcementsService.delete(id).pipe(
            map(() => AnnouncementsActions.removeSuccess({ id })),
            catchError(() => of(AnnouncementsActions.removeFailure()))
        ))
    ));

    removeManyEffect$ = createEffect(() => this.actions$.pipe(
        ofType(AnnouncementsActions.removeMany),
        switchMap(({ request }) => this.announcementsService.deleteMany(request).pipe(
            map(() => AnnouncementsActions.removeManySuccess({ ids: request.ids })),
            catchError(() => of(AnnouncementsActions.removeManyFailure()))
        ))
    ));

    reloadEffect$ = createEffect(() => this.actions$.pipe(
        ofType(
            AnnouncementsActions.createSuccess,
            AnnouncementsActions.removeSuccess,
            AnnouncementsActions.removeManySuccess
        ),
        map(() => AnnouncementsActions.load())
    ));
}
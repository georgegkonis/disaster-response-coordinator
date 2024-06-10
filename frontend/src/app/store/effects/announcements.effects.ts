import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AnnouncementsService } from '../../services/announcements.service';
import { of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AnnouncementsActions } from '../actions/announcements.actions';
import { AppMessageService } from '../../services/app-message.service';
import { AppLoaderService } from '../../services/app-loader.service';
import { withMinDelay } from '../../utilities/with-min-delay';

@Injectable()
export class AnnouncementsEffects {

    constructor(
        private actions$: Actions,
        private announcementsService: AnnouncementsService,
        private messageService: AppMessageService,
        private loaderService: AppLoaderService
    ) {}

    loadEffect$ = createEffect(() => this.actions$.pipe(
        ofType(AnnouncementsActions.load),
        tap(() => this.loaderService.show()),
        switchMap(() => withMinDelay(this.announcementsService.find()).pipe(
            map(announcements => AnnouncementsActions.loadSuccess({ announcements })),
            tap(() => this.loaderService.hide()),
            catchError(() => of(AnnouncementsActions.loadFailure()))
        ))
    ));

    createEffect$ = createEffect(() => this.actions$.pipe(
        ofType(AnnouncementsActions.create),
        switchMap(({ request }) => this.announcementsService.create(request).pipe(
            map(announcement => AnnouncementsActions.createSuccess({ announcement })),
            tap(() => this.messageService.showSuccess('Announcement created successfully')),
            catchError(() => of(AnnouncementsActions.createFailure()))
        ))
    ));

    removeEffect$ = createEffect(() => this.actions$.pipe(
        ofType(AnnouncementsActions.remove),
        switchMap(({ id }) => this.announcementsService.delete(id).pipe(
            map(() => AnnouncementsActions.removeSuccess({ id })),
            tap(() => this.messageService.showSuccess('Announcement removed successfully')),
            catchError(() => of(AnnouncementsActions.removeFailure()))
        ))
    ));

    removeManyEffect$ = createEffect(() => this.actions$.pipe(
        ofType(AnnouncementsActions.removeMany),
        switchMap(({ request }) => this.announcementsService.deleteMany(request).pipe(
            map(() => AnnouncementsActions.removeManySuccess({ ids: request.ids })),
            tap(() => this.messageService.showSuccess('Announcements removed successfully')),
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
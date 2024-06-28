import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemOfferService } from '../../services/item-offer.service';
import { AppLoaderService } from '../../services/app-loader.service';
import { AppMessageService } from '../../services/app-message.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { finalize, of } from 'rxjs';
import { ItemOfferActions } from '../actions/item-offer.actions';
import { withMinDelay } from '../../utilities/with-min-delay';

@Injectable()
export class ItemOfferEffects {

    constructor(
        private actions$: Actions,
        private itemOfferService: ItemOfferService,
        private messageService: AppMessageService,
        private loaderService: AppLoaderService
    ) {}

    loadEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemOfferActions.load),
        tap(() => this.loaderService.show()),
        mergeMap(() => withMinDelay(this.itemOfferService.find()).pipe(
            map((itemOffers) => ItemOfferActions.loadSuccess({ itemOffers })),
            catchError(() => of(ItemOfferActions.loadFailure()))
        )),
        finalize(() => this.loaderService.hide())
    ));

    loadMineEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemOfferActions.loadMine),
        tap(() => this.loaderService.show()),
        mergeMap(() => withMinDelay(this.itemOfferService.findMine()).pipe(
            map((itemOffers) => ItemOfferActions.loadMineSuccess({ itemOffers })),
            catchError(() => of(ItemOfferActions.loadMineFailure()))
        )),
        finalize(() => this.loaderService.hide())
    ));

    createEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemOfferActions.create),
        mergeMap(({ request }) => this.itemOfferService.create(request).pipe(
            map((itemOffer) => ItemOfferActions.createSuccess({ itemOffer })),
            tap(() => this.messageService.showSuccess('Item offer created successfully')),
            catchError(() => of(ItemOfferActions.createFailure()))
        ))
    ));

    updateStatusEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemOfferActions.updateStatus),
        mergeMap(({ id, status }) => this.itemOfferService.updateStatus(id, status).pipe(
            map((itemOffer) => ItemOfferActions.updateStatusSuccess({ itemOffer })),
            tap(() => this.messageService.showSuccess('Item offer status updated successfully')),
            catchError(() => of(ItemOfferActions.updateStatusFailure()))
        ))
    ));

    deleteEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ItemOfferActions.$delete),
        mergeMap(({ id }) => this.itemOfferService.delete(id).pipe(
            map(() => ItemOfferActions.deleteSuccess({ id })),
            tap(() => this.messageService.showSuccess('Item offer deleted successfully')),
            catchError(() => of(ItemOfferActions.deleteFailure()))
        ))
    ));
}
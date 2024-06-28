import { createAction, props } from '@ngrx/store';
import { FAILURE, SUCCESS } from '../../constants/action-types';
import { ItemOffer } from '../../models/item-offer.model';
import { TaskStatus } from '../../enums/task-status.enum';
import { CreateItemOfferRequest } from '../../dto/requests/create-item-offer-request.dto';

const NAMESPACE: string = '[ITEM OFFER]';

export namespace ItemOfferActions {

    //#region Load Item Offers

    export const load = createAction(
        `${NAMESPACE} Load Item Offers`,
        props<{ status?: TaskStatus, item?: string, citizen?: string }>()
    );

    export const loadSuccess = createAction(
        `${NAMESPACE} Load Item Offers ${SUCCESS}`,
        props<{ itemOffers: ItemOffer[] }>()
    );

    export const loadFailure = createAction(
        `${NAMESPACE} Load Item Offers ${FAILURE}`
    );

    //#endregion

    //#region Load My Item Offers

    export const loadMine = createAction(
        `${NAMESPACE} Load My Item Offers`,
        props<{ status?: TaskStatus, item?: string }>()
    );

    export const loadMineSuccess = createAction(
        `${NAMESPACE} Load My Item Offers ${SUCCESS}`,
        props<{ itemOffers: ItemOffer[] }>()
    );

    export const loadMineFailure = createAction(
        `${NAMESPACE} Load My Item Offers ${FAILURE}`
    );

    //#endregion

    //#region Create Item Offer

    export const create = createAction(
        `${NAMESPACE} Create Item Offer`,
        props<{ request: CreateItemOfferRequest }>()
    );

    export const createSuccess = createAction(
        `${NAMESPACE} Create Item Offer ${SUCCESS}`,
        props<{ itemOffer: ItemOffer }>()
    );

    export const createFailure = createAction(
        `${NAMESPACE} Create Item Offer ${FAILURE}`
    );

    //#endregion

    //#region Update Item Offer Status

    export const updateStatus = createAction(
        `${NAMESPACE} Update Item Offer Status`,
        props<{ id: string, status: TaskStatus }>()
    );

    export const updateStatusSuccess = createAction(
        `${NAMESPACE} Update Item Offer Status ${SUCCESS}`,
        props<{ itemOffer: ItemOffer }>()
    );

    export const updateStatusFailure = createAction(
        `${NAMESPACE} Update Item Offer Status ${FAILURE}`
    );

    //#endregion

    //#region Delete Item Offer

    export const $delete = createAction(
        `${NAMESPACE} Delete Item Offer`,
        props<{ id: string }>()
    );

    export const deleteSuccess = createAction(
        `${NAMESPACE} Delete Item Offer ${SUCCESS}`,
        props<{ id: string }>()
    );

    export const deleteFailure = createAction(
        `${NAMESPACE} Delete Item Offer ${FAILURE}`
    );

    //#endregion

    //#region Reset

    export const reset = createAction(
        `${NAMESPACE} Reset`
    );

    //#endregion
}
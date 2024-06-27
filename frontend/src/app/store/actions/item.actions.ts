import { createAction, props } from '@ngrx/store';
import { CreateItemRequest } from '../../dto/requests/create-item-request.dto';
import { FAILURE, SUCCESS } from '../../constants/action-types';
import { Item } from '../../models/item.model';
import { LoadItemsRequest } from '../../dto/requests/load-items-request.dto';
import { UpdateItemRequest } from '../../dto/requests/update-item-request.dto';
import { DeleteManyRequest } from '../../dto/requests/delete-many-request.dto';

const NAMESPACE: string = '[ITEMS]';

export namespace ItemActions {

    //#region Load Items

    export const load = createAction(
        `${NAMESPACE} Load Items`,
        props<{ request: LoadItemsRequest }>()
    );

    export const loadSuccess = createAction(
        `${NAMESPACE} Load Items ${SUCCESS}`,
        props<{ items: Item[] }>()
    );

    export const loadFailure = createAction(
        `${NAMESPACE} Load Items ${FAILURE}`
    );

    //#endregion

    //#region Create Item

    export const create = createAction(
        `${NAMESPACE} Create Item`,
        props<{ request: CreateItemRequest }>()
    );

    export const createSuccess = createAction(
        `${NAMESPACE} Create Item ${SUCCESS}`,
        props<{ item: Item }>()
    );

    export const createFailure = createAction(
        `${NAMESPACE} Create Item ${FAILURE}`
    );

    //#endregion

    //#region Update Item

    export const update = createAction(
        `${NAMESPACE} Update Item`,
        props<{ id: string, request: UpdateItemRequest }>()
    );

    export const updateSuccess = createAction(
        `${NAMESPACE} Update Item ${SUCCESS}`,
        props<{ item: Item }>()
    );

    export const updateFailure = createAction(
        `${NAMESPACE} Update Item ${FAILURE}`
    );

    //#endregion

    //#region Delete Item

    export const $delete = createAction(
        `${NAMESPACE} Delete Item`,
        props<{ id: string }>()
    );

    export const deleteSuccess = createAction(
        `${NAMESPACE} Delete Item ${SUCCESS}`,
        props<{ id: string }>()
    );

    export const deleteFailure = createAction(
        `${NAMESPACE} Delete Item ${FAILURE}`
    );

    //#endregion

    //#region Delete Items

    export const deleteMany = createAction(
        `${NAMESPACE} Delete Items`,
        props<{ request: DeleteManyRequest }>()
    );

    export const deleteManySuccess = createAction(
        `${NAMESPACE} Delete Items ${SUCCESS}`,
        props<{ ids: string[] }>()
    );

    export const deleteManyFailure = createAction(
        `${NAMESPACE} Delete Items ${FAILURE}`
    );

    //#endregion

    //#region Reset

    export const reset = createAction(
        `${NAMESPACE} Reset`
    );

    //#endregion
}
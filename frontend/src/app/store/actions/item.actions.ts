import { createAction, props } from '@ngrx/store';
import { CreateItemRequest } from '../../dto/requests/create-item-request.dto';
import { FAILURE, SUCCESS } from '../../constants/action-types';
import { Item } from '../../models/item.model';
import { LoadItemsRequest } from '../../dto/requests/load-items-request.dto';
import { UpdateItemRequest } from '../../dto/requests/update-item-request.dto';
import { DeleteManyRequest } from '../../dto/requests/delete-many-request.dto';

export namespace ItemActions {

    const NAMESPACE: string = '[ITEMS]';

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

    export const remove = createAction(
        `${NAMESPACE} Remove Item`,
        props<{ id: string }>()
    );

    export const removeSuccess = createAction(
        `${NAMESPACE} Remove Item ${SUCCESS}`,
        props<{ id: string }>()
    );

    export const removeFailure = createAction(
        `${NAMESPACE} Remove Item ${FAILURE}`
    );

    export const removeMany = createAction(
        `${NAMESPACE} Remove Many Items`,
        props<{ request: DeleteManyRequest }>()
    );

    export const removeManySuccess = createAction(
        `${NAMESPACE} Remove Many Items ${SUCCESS}`,
        props<{ ids: string[] }>()
    );

    export const removeManyFailure = createAction(
        `${NAMESPACE} Remove Many Items ${FAILURE}`
    );
}
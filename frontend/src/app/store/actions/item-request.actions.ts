import { createAction, props } from '@ngrx/store';
import { FAILURE, SUCCESS } from '../../constants/action-types';
import { ItemRequest } from '../../models/item-request.model';
import { CreateItemRequestRequest } from '../../dto/requests/create-item-request-request.dto';
import { TaskStatus } from '../../enums/task-status.enum';

const NAMESPACE: string = '[ITEM REQUEST]';

export namespace ItemRequestActions {

    //#region Load Item Requests

    export const load = createAction(
        `${NAMESPACE} Load Item Requests`,
        props<{ status?: TaskStatus, item?: string, citizen?: string }>()
    );

    export const loadSuccess = createAction(
        `${NAMESPACE} Load Item Requests ${SUCCESS}`,
        props<{ itemRequests: ItemRequest[] }>()
    );

    export const loadFailure = createAction(
        `${NAMESPACE} Load Item Requests ${FAILURE}`
    );

    //#endregion

    //#region Load My Item Requests

    export const loadMine = createAction(
        `${NAMESPACE} Load My Item Requests`,
        props<{ status?: TaskStatus, item?: string }>()
    );

    export const loadMineSuccess = createAction(
        `${NAMESPACE} Load My Item Requests ${SUCCESS}`,
        props<{ itemRequests: ItemRequest[] }>()
    );

    export const loadMineFailure = createAction(
        `${NAMESPACE} Load My Item Requests ${FAILURE}`
    );

    //#endregion

    //#region Create Item Request

    export const create = createAction(
        `${NAMESPACE} Create Item Request`,
        props<{ request: CreateItemRequestRequest }>()
    );

    export const createSuccess = createAction(
        `${NAMESPACE} Create Item Request ${SUCCESS}`,
        props<{ itemRequest: ItemRequest }>()
    );

    export const createFailure = createAction(
        `${NAMESPACE} Create Item Request ${FAILURE}`
    );

    //#endregion

    //#region Update Item Request Status

    export const updateStatus = createAction(
        `${NAMESPACE} Update Item Request Status`,
        props<{ id: string, status: TaskStatus }>()
    );

    export const updateStatusSuccess = createAction(
        `${NAMESPACE} Update Item Request Status ${SUCCESS}`,
        props<{ itemRequest: ItemRequest }>()
    );

    export const updateStatusFailure = createAction(
        `${NAMESPACE} Update Item Request Status ${FAILURE}`
    );

    //#endregion

    //#region Delete Item Request

    export const $delete = createAction(
        `${NAMESPACE} Delete Item Request`,
        props<{ id: string }>()
    );

    export const deleteSuccess = createAction(
        `${NAMESPACE} Delete Item Request ${SUCCESS}`,
        props<{ id: string }>()
    );

    export const deleteFailure = createAction(
        `${NAMESPACE} Delete Item Request ${FAILURE}`
    );

    //#endregion

    //#region Reset

    export const reset = createAction(
        `${NAMESPACE} Reset`
    );

    //#endregion
}
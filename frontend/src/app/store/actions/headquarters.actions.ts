import { createAction, props } from '@ngrx/store';
import { CreateHeadquartersRequest } from '../../dto/requests/create-headquarters-request.dto';
import { Headquarters } from '../../models/headquarters.model';
import { FAILURE, SUCCESS } from '../../constants/action-types';

const NAMESPACE = '[HEADQUARTERS]';

export namespace HeadquartersActions {

    //#region Load Headquarters

    export const load = createAction(
        `${NAMESPACE} Load Headquarters`
    );

    export const loadSuccess = createAction(
        `${NAMESPACE} Load Headquarters ${SUCCESS}`,
        props<{ headquarters: Headquarters[] }>()
    );

    export const loadFailure = createAction(
        `${NAMESPACE} Load Headquarters ${FAILURE}`
    );

    //#endregion

    //#region Create Headquarters

    export const create = createAction(
        `${NAMESPACE} Create Headquarters`,
        props<{ request: CreateHeadquartersRequest }>()
    );

    export const createSuccess = createAction(
        `${NAMESPACE} Create Headquarters ${SUCCESS}`,
        props<{ headquarters: Headquarters }>()
    );

    export const createFailure = createAction(
        `${NAMESPACE} Create Headquarters ${FAILURE}`
    );

    //#endregion

    //#region Delete Headquarters

    export const $delete = createAction(
        `${NAMESPACE} Delete Headquarters`,
        props<{ id: string }>()
    );

    export const deleteSuccess = createAction(
        `${NAMESPACE} Delete Headquarters ${SUCCESS}`,
        props<{ id: string }>()
    );

    export const deleteFailure = createAction(
        `${NAMESPACE} Delete Headquarters ${FAILURE}`
    );

    //#endregion

    //#region Reset Headquarters

    export const reset = createAction(
        `${NAMESPACE} Reset Headquarters`
    );

    //#endregion
}
import { createAction, props } from '@ngrx/store';
import { FAILURE, SUCCESS } from '../../constants/action-types';

const NAMESPACE: string = '[WAREHOUSE]';

export namespace WarehouseActions {

    //#region Export Warehouse Data

    export const exportData = createAction(
        `${NAMESPACE} Export Warehouse Data`
    );

    export const exportDataSuccess = createAction(
        `${NAMESPACE} Export Warehouse Data ${SUCCESS}`,
        props<{ data: Blob }>()
    );

    export const exportDataFailure = createAction(
        `${NAMESPACE} Export Warehouse Data ${FAILURE}`
    );

    //#endregion

    //#region Import Warehouse Data

    export const importData = createAction(
        `${NAMESPACE} Import Warehouse Data`,
        props<{ file: File }>()
    );

    export const importDataSuccess = createAction(
        `${NAMESPACE} Import Warehouse Data ${SUCCESS}`
    );

    export const importDataFailure = createAction(
        `${NAMESPACE} Import Warehouse Data ${FAILURE}`
    );

    //#endregion

    //#region Clear Warehouse Data

    export const clearData = createAction(
        `${NAMESPACE} Clear Warehouse Data`
    );

    export const clearDataSuccess = createAction(
        `${NAMESPACE} Clear Warehouse Data ${SUCCESS}`
    );

    export const clearDataFailure = createAction(
        `${NAMESPACE} Clear Warehouse Data ${FAILURE}`
    );

    //#endregion
}



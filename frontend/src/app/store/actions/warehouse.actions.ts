import { createAction, props } from '@ngrx/store';
import { FAILURE, SUCCESS } from '../../constants/action-types';

export namespace WarehouseActions {

    const NAMESPACE: string = '[WAREHOUSE]';

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

    export const clearData = createAction(
        `${NAMESPACE} Clear Warehouse Data`
    );

    export const clearDataSuccess = createAction(
        `${NAMESPACE} Clear Warehouse Data ${SUCCESS}`
    );

    export const clearDataFailure = createAction(
        `${NAMESPACE} Clear Warehouse Data ${FAILURE}`
    );
}



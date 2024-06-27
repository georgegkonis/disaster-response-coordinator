import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';
import { UpdateUserRequest } from '../../dto/requests/update-user-request.dto';
import { FAILURE, SUCCESS } from '../../constants/action-types';
import { CreateUserRequest } from '../../dto/requests/create-user-request.dto';

const NAMESPACE: string = '[Users]';

export namespace UserActions {

    //#region Load

    export const load = createAction(
        `${NAMESPACE} Get All`
    );

    export const loadSuccess = createAction(
        `${NAMESPACE} Get All ${SUCCESS}`,
        props<{ users: User[] }>()
    );

    export const loadFailure = createAction(
        `${NAMESPACE} Get All ${FAILURE}`
    );

    //#endregion

    //#region Create

    export const create = createAction(
        `${NAMESPACE} Create`,
        props<{ request: CreateUserRequest }>()
    );

    export const createSuccess = createAction(
        `${NAMESPACE} Create ${SUCCESS}`,
        props<{ user: User }>()
    );

    export const createFailure = createAction(
        `${NAMESPACE} Create ${FAILURE}`
    );

    //#endregion

    //#region Update

    export const update = createAction(
        `${NAMESPACE} Update`,
        props<{ request: UpdateUserRequest }>()
    );

    export const updateSuccess = createAction(
        `${NAMESPACE} Update ${SUCCESS}`,
        props<{ user: User }>()
    );

    export const updateFailure = createAction(
        `${NAMESPACE} Update ${FAILURE}`
    );

    //#endregion

    //#region Delete

    export const remove = createAction(
        `${NAMESPACE} Remove`,
        props<{ id: string }>()
    );

    export const removeSuccess = createAction(
        `${NAMESPACE} Remove ${SUCCESS}`,
        props<{ id: string }>()
    );

    export const removeFailure = createAction(
        `${NAMESPACE} Remove ${FAILURE}`
    );

    //#endregion

    //#region Load Me

    export const loadMe = createAction(
        `${NAMESPACE} Load Me`
    );

    export const loadMeSuccess = createAction(
        `${NAMESPACE} Load Me ${SUCCESS}`,
        props<{ user: User }>()
    );

    export const loadMeFailure = createAction(
        `${NAMESPACE} Load Me ${FAILURE}`
    );

    //#endregion

    //#region Update Me

    export const updateMe = createAction(
        `${NAMESPACE} Update Me`,
        props<{ request: UpdateUserRequest }>()
    );

    export const updateMeSuccess = createAction(
        `${NAMESPACE} Update Me ${SUCCESS}`,
        props<{ user: User }>()
    );

    export const updateMeFailure = createAction(
        `${NAMESPACE} Update Me ${FAILURE}`
    );

    //#endregion

    export const reset = createAction(
        `${NAMESPACE} Reset`
    );
}

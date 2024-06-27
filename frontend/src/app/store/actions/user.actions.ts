import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';
import { UpdateUserRequest } from '../../dto/requests/update-user-request.dto';
import { FAILURE, SUCCESS } from '../../constants/action-types';
import { CreateUserRequest } from '../../dto/requests/create-user-request.dto';

const NAMESPACE: string = '[USERS]';

export namespace UserActions {

    //#region Load Users

    export const load = createAction(
        `${NAMESPACE} Load Users`
    );

    export const loadSuccess = createAction(
        `${NAMESPACE} Load Users ${SUCCESS}`,
        props<{ users: User[] }>()
    );

    export const loadFailure = createAction(
        `${NAMESPACE} Load Users ${FAILURE}`
    );

    //#endregion

    //#region Create User

    export const create = createAction(
        `${NAMESPACE} Create User`,
        props<{ request: CreateUserRequest }>()
    );

    export const createSuccess = createAction(
        `${NAMESPACE} Create User ${SUCCESS}`,
        props<{ user: User }>()
    );

    export const createFailure = createAction(
        `${NAMESPACE} Create User ${FAILURE}`
    );

    //#endregion

    //#region Update User

    export const update = createAction(
        `${NAMESPACE} Update User`,
        props<{ request: UpdateUserRequest }>()
    );

    export const updateSuccess = createAction(
        `${NAMESPACE} Update User ${SUCCESS}`,
        props<{ user: User }>()
    );

    export const updateFailure = createAction(
        `${NAMESPACE} Update User ${FAILURE}`
    );

    //#endregion

    //#region Delete User

    export const $delete = createAction(
        `${NAMESPACE} Delete User`,
        props<{ id: string }>()
    );

    export const deleteSuccess = createAction(
        `${NAMESPACE} Delete User ${SUCCESS}`,
        props<{ id: string }>()
    );

    export const deleteFailure = createAction(
        `${NAMESPACE} Delete User ${FAILURE}`
    );

    //#endregion

    //#region Load Current User

    export const loadMe = createAction(
        `${NAMESPACE} Load Current User`
    );

    export const loadMeSuccess = createAction(
        `${NAMESPACE} Load Current User ${SUCCESS}`,
        props<{ user: User }>()
    );

    export const loadMeFailure = createAction(
        `${NAMESPACE} Load Current User ${FAILURE}`
    );

    //#endregion

    //#region Update Current User

    export const updateMe = createAction(
        `${NAMESPACE} Update Current User`,
        props<{ request: UpdateUserRequest }>()
    );

    export const updateMeSuccess = createAction(
        `${NAMESPACE} Update Current User ${SUCCESS}`,
        props<{ user: User }>()
    );

    export const updateMeFailure = createAction(
        `${NAMESPACE} Update Current User ${FAILURE}`
    );

    //#endregion

    //#region Reset

    export const reset = createAction(
        `${NAMESPACE} Reset`
    );

    //#endregion
}

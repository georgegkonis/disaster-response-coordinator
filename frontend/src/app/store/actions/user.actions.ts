import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';
import { UpdateUserRequest } from '../../dto/requests/update-user-request.dto';

const SUCCESS: string = '[Success]';
const FAILURE: string = '[Failure]';
const NAMESPACE: string = '[Users]';

export namespace UserActions {

    //#region Get All

    export const getAll = createAction(
        `${NAMESPACE} Get All`
    );

    export const getAllSuccess = createAction(
        `${NAMESPACE}/${SUCCESS} Get All`,
        props<{ users: User[] }>()
    );

    export const getAllFailure = createAction(
        `${NAMESPACE}/${FAILURE} Get All`
    );

    //#endregion

    //#region Get Me

    export const getMe = createAction(
        `${NAMESPACE} Get Me`
    );

    export const getMeSuccess = createAction(
        `${NAMESPACE}/${SUCCESS} Get Me`,
        props<{ user: User }>()
    );

    export const getMeFailure = createAction(
        `${NAMESPACE}/${FAILURE} Get Me`
    );

    //#endregion

    //#region Update Me

    export const updateMe = createAction(
        `${NAMESPACE} Update Me`,
        props<{ request: UpdateUserRequest }>()
    );

    export const updateMeSuccess = createAction(
        `${NAMESPACE}/${SUCCESS} Update Me`,
        props<{ user: User }>()
    );

    export const updateMeFailure = createAction(
        `${NAMESPACE}/${FAILURE} Update Me`
    );

    //#endregion
}

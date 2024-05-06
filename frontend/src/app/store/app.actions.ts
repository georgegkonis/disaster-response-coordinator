import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';
import { LoginRequest } from '../dto/requests/login-request.dto';
import { RegisterRequest } from '../dto/requests/register-request.dto';
import { UpdateUserRequest } from '../dto/requests/update-user-request.dto';

const SUCCESS: string = '[Success]';
const FAILURE: string = '[Failure]';

export namespace AuthActions {

    const NAMESPACE: string = '[Authentication]';

    //#region Login

    export const login = createAction(
        `${NAMESPACE} Login`,
        props<{ request: LoginRequest }>()
    );

    export const loginSuccess = createAction(
        `${NAMESPACE}/${SUCCESS} Login`
    );

    export const loginFailure = createAction(
        `${NAMESPACE}/${FAILURE} Login`
    );

    //#endregion

    //#region Register

    export const register = createAction(
        `${NAMESPACE} Register`,
        props<{ request: RegisterRequest }>()
    );

    export const registerSuccess = createAction(
        `${NAMESPACE}/${SUCCESS} Register`
    );

    export const registerFailure = createAction(
        `${NAMESPACE}/${FAILURE} Register`
    );

    //#endregion

    //#region Logout

    export const logout = createAction(
        `${NAMESPACE} Logout`
    );

    export const logoutSuccess = createAction(
        `${NAMESPACE}/${SUCCESS} Logout`
    );

    export const logoutFailure = createAction(
        `${NAMESPACE}/${FAILURE} Logout`
    );

    //#endregion
}

export namespace UserActions {

    const NAMESPACE: string = '[Users]';

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
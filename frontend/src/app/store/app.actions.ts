import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';
import { LoginRequest } from '../dto/requests/login-request.dto';
import { RegisterRequest } from '../dto/requests/register-request.dto';

const SUCCESS: string = '[Success]';
const FAILURE: string = '[Failure]';

export namespace AuthActions {

    const NAMESPACE: string = '[Authentication]';

    //#region Login

    export const login = createAction(
        `${NAMESPACE} Login`,
        props<LoginRequest>()
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
        props<RegisterRequest>()
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

    //#region Get All Users

    export const getAll = createAction(
        `${NAMESPACE} Get All Users`
    );

    export const getAllSuccess = createAction(
        `${NAMESPACE}/${SUCCESS} Get All Users`,
        props<{ users: User[] }>()
    );

    export const getAllFailure = createAction(
        `${NAMESPACE}/${FAILURE} Get All Users`
    );

    //#endregion

    //#region Get Current User

    export const getCurrent = createAction(
        `${NAMESPACE} Get Current User`
    );

    export const getCurrentSuccess = createAction(
        `${NAMESPACE}/${SUCCESS} Get Current User`,
        props<User>()
    );

    export const getCurrentFailure = createAction(
        `${NAMESPACE}/${FAILURE} Get Current User`
    );

    //#endregion

    //#region Update Current User

    export const updateCurrent = createAction(
        `${NAMESPACE} Update Current User`,
        props<{ username?: string, password?: string }>()
    );

    export const updateCurrentSuccess = createAction(
        `${NAMESPACE}/${SUCCESS} Update Current User`,
        props<User>()
    );

    export const updateCurrentFailure = createAction(
        `${NAMESPACE}/${FAILURE} Update Current User`
    );

    //#endregion
}
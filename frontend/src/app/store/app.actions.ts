import { createAction, props } from '@ngrx/store';
import { LoginRequest, RegisterRequest, UpdateUserRequest } from '../models/requests.model';
import { GetUsersResponse, LoginResponse } from '../models/responses.model';
import { User } from '../models/user.model';

export namespace AuthActions {

    const namespace: string = '[Authentication]';

    //#region Login

    export const login = createAction(
        `${namespace} Login`,
        props<LoginRequest>()
    );

    export const loginSuccess = createAction(
        `${namespace} Login Success`,
        props<LoginResponse>()
    );

    export const loginFailure = createAction(
        `${namespace} Login Failure`
    );

    //#endregion

    //#region Register

    export const register = createAction(
        `${namespace} Register`,
        props<RegisterRequest>()
    );

    export const registerSuccess = createAction(
        `${namespace} Register Success`
    );

    export const registerFailure = createAction(
        `${namespace} Register Failure`
    );

    //#endregion

    //#region Logout

    export const logout = createAction(
        `${namespace} Logout`
    );

    export const logoutSuccess = createAction(
        `${namespace} Logout Success`
    );

    export const logoutFailure = createAction(
        `${namespace} Logout Failure`
    );

    //#endregion
}

export namespace UserActions {

    const namespace: string = '[Users]';

    //#region Get All Users

    export const getAll = createAction(
        `${namespace} Get All Users`
    );

    export const getAllSuccess = createAction(
        `${namespace} Get All Users Success`,
        props<GetUsersResponse>()
    );

    export const getAllFailure = createAction(
        `${namespace} Get All Users Failure`
    );

    //#endregion

    //#region Get Current User

    export const getCurrent = createAction(
        `${namespace} Get Current User`
    );

    export const getCurrentSuccess = createAction(
        `${namespace} Get Current Success User`,
        props<User>()
    );

    export const getCurrentFailure = createAction(
        `${namespace} Get Current Failure User`
    );

    //#endregion

    //#region Update Current User

    export const updateCurrent = createAction(
        `${namespace} Update Current User`,
        props<UpdateUserRequest>()
    );

    export const updateCurrentSuccess = createAction(
        `${namespace} Update Current User Success`,
        props<User>()
    );

    export const updateCurrentFailure = createAction(
        `${namespace} Update Current User Failure`
    );

    //#endregion
}

export namespace ProductActions {

    const namespace: string = '[Products]';
}

export namespace CategoryActions {

    const namespace: string = '[Categories]';
}

export namespace StoreActions {

    const namespace: string = '[Stores]';
}
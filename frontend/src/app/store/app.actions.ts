import { createAction, props } from '@ngrx/store';
import { LoginRequest, RegisterRequest } from '../models/requests.model';

export namespace AuthActions {

    const namespace = '[AUTH]';

    //#region Login

    export const login = createAction(
        `${namespace} Login`,
        props<LoginRequest>()
    );

    export const loginSuccess = createAction(
        `${namespace} Login Success`,
        props<{ token: object }>()
    );

    export const loginFailure = createAction(
        `${namespace} Login Failure`,
        props<{ error: any }>()
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
        `${namespace} Register Failure`,
        props<{ error: any }>()
    );

    //#endregion

    //#region Logout

    export const logout = createAction(
        `${namespace} Logout`
    );

    //#endregion
}

export const resetState = createAction(
    'Reset App State'
);
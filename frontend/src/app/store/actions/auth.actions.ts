import { createAction, props } from '@ngrx/store';
import { LoginRequest } from '../../dto/requests/login-request.dto';
import { RegisterRequest } from '../../dto/requests/register-request.dto';

const SUCCESS: string = '[Success]';
const FAILURE: string = '[Failure]';
const NAMESPACE: string = '[Authentication]';

export namespace AuthActions {

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



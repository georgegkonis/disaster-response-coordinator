import { createAction, props } from '@ngrx/store';
import { LoginRequest } from '../../dto/requests/login-request.dto';
import { RegisterRequest } from '../../dto/requests/register-request.dto';
import { FAILURE, SUCCESS } from '../../constants/action-types';

const NAMESPACE: string = '[AUTHENTICATION]';

export namespace AuthActions {

    //#region Login

    export const login = createAction(
        `${NAMESPACE} Login`,
        props<{ request: LoginRequest }>()
    );

    export const loginSuccess = createAction(
        `${NAMESPACE} Login ${SUCCESS}`
    );

    export const loginFailure = createAction(
        `${NAMESPACE} Login ${FAILURE}`
    );

    //#endregion

    //#region Register

    export const register = createAction(
        `${NAMESPACE} Register`,
        props<{ request: RegisterRequest }>()
    );

    export const registerSuccess = createAction(
        `${NAMESPACE} Register ${SUCCESS}`
    );

    export const registerFailure = createAction(
        `${NAMESPACE} Register ${FAILURE}`
    );

    //#endregion

    //#region Logout

    export const logout = createAction(
        `${NAMESPACE} Logout`
    );

    export const logoutSuccess = createAction(
        `${NAMESPACE} Logout ${SUCCESS}`
    );

    export const logoutFailure = createAction(
        `${NAMESPACE} Logout ${FAILURE}`
    );

    //#endregion
}



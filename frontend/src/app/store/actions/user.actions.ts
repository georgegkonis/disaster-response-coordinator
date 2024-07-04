import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';
import { UpdateUserRequest } from '../../dto/requests/update-user-request.dto';
import { FAILURE, SUCCESS } from '../../constants/action-types';
import { CreateUserRequest } from '../../dto/requests/create-user-request.dto';
import { MapLocation } from '../../models/map-location.model';
import { UserRole } from '../../enums/user-role.enum';

const NAMESPACE: string = '[USERS]';

export namespace UserActions {

    //#region Load Users

    export const load = createAction(
        `${NAMESPACE} Load Users`,
        props<{ role?: UserRole }>()
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

    //#region Update My Location

    export const updateMyLocation = createAction(
        `${NAMESPACE} Update My Location`,
        props<{ location: MapLocation }>()
    );

    export const updateMyLocationSuccess = createAction(
        `${NAMESPACE} Update My Location ${SUCCESS}`,
        props<{ location: MapLocation }>()
    );

    export const updateMyLocationFailure = createAction(
        `${NAMESPACE} Update My Location ${FAILURE}`
    );

    //#endregion

    //#region Update My Inventory

    export const updateMyInventory = createAction(
        `${NAMESPACE} Update My Inventory`,
        props<{ item: string, quantity: number }>()
    );

    export const updateMyInventorySuccess = createAction(
        `${NAMESPACE} Update My Inventory ${SUCCESS}`,
        props<{ user: User }>()
    );

    export const updateMyInventoryFailure = createAction(
        `${NAMESPACE} Update My Inventory ${FAILURE}`
    );

    //#endregion

    //#region Reset

    export const reset = createAction(
        `${NAMESPACE} Reset`
    );

    //#endregion
}

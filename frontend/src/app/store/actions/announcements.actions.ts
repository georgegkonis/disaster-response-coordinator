import { createAction, props } from '@ngrx/store';
import { CreateAnnouncementRequest } from '../../dto/requests/create-announcement-request.dto';
import { Announcement } from '../../models/announcement.model';
import { DeleteManyRequest } from '../../dto/requests/delete-many-request.dto';
import { FAILURE, SUCCESS } from '../../constants/action-types';

const NAMESPACE: string = '[ANNOUNCEMENTS]';

export namespace AnnouncementsActions {

    //#region Load Announcements

    export const load = createAction(
        `${NAMESPACE} Load Announcements`
    );

    export const loadSuccess = createAction(
        `${NAMESPACE} Load Announcements ${SUCCESS}`,
        props<{ announcements: Announcement[] }>()
    );

    export const loadFailure = createAction(
        `${NAMESPACE} Load Announcements ${FAILURE}`
    );

    //#endregion

    //#region Create Announcement

    export const create = createAction(
        `${NAMESPACE} Create Announcement`,
        props<{ request: CreateAnnouncementRequest }>()
    );

    export const createSuccess = createAction(
        `${NAMESPACE} Create Announcement ${SUCCESS}`,
        props<{ announcement: Announcement }>()
    );

    export const createFailure = createAction(
        `${NAMESPACE} Create Announcement ${FAILURE}`
    );

    //#endregion

    //#region Delete Announcement

    export const $delete = createAction(
        `${NAMESPACE} Delete Announcement`,
        props<{ id: string }>()
    );

    export const deleteSuccess = createAction(
        `${NAMESPACE} Delete Announcement ${SUCCESS}`,
        props<{ id: string }>()
    );

    export const deleteFailure = createAction(
        `${NAMESPACE} Delete Announcement ${FAILURE}`
    );

    //#endregion

    //#region Delete Announcements

    export const deleteMany = createAction(
        `${NAMESPACE} Delete Announcements`,
        props<{ request: DeleteManyRequest }>()
    );

    export const deleteManySuccess = createAction(
        `${NAMESPACE} Delete Announcements ${SUCCESS}`,
        props<{ ids: string[] }>()
    );

    export const deleteManyFailure = createAction(
        `${NAMESPACE} Delete Announcements ${FAILURE}`
    );

    //#endregion

    //#region Reset

    export const reset = createAction(
        `${NAMESPACE} Reset`
    );

    //#endregion
}
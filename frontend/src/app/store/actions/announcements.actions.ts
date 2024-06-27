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

    //#region Remove Announcement

    export const remove = createAction(
        `${NAMESPACE} Remove Announcement`,
        props<{ id: string }>()
    );

    export const removeSuccess = createAction(
        `${NAMESPACE} Remove Announcement ${SUCCESS}`,
        props<{ id: string }>()
    );

    export const removeFailure = createAction(
        `${NAMESPACE} Remove Announcement ${FAILURE}`
    );

    //#endregion

    //#region Remove Announcements

    export const removeMany = createAction(
        `${NAMESPACE} Remove Announcements`,
        props<{ request: DeleteManyRequest }>()
    );

    export const removeManySuccess = createAction(
        `${NAMESPACE} Remove Announcements ${SUCCESS}`,
        props<{ ids: string[] }>()
    );

    export const removeManyFailure = createAction(
        `${NAMESPACE} Remove Announcements ${FAILURE}`
    );

    //#endregion

    //#region Reset

    export const reset = createAction(
        `${NAMESPACE} Reset`
    );

    //#endregion
}
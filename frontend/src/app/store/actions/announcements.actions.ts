import { createAction, props } from '@ngrx/store';
import { CreateAnnouncementRequest } from '../../dto/requests/create-announcement-request.dto';
import { Announcement } from '../../models/announcement.model';
import { DeleteManyRequest } from '../../dto/requests/delete-many-request.dto';

export namespace AnnouncementsActions {

    const NAMESPACE: string = '[ANNOUNCEMENTS]';
    const SUCCESS: string = '(SUCCESS)';
    const FAILURE: string = '(FAILURE)';

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

    export const removeMany = createAction(
        `${NAMESPACE} Remove Many Announcements`,
        props<{ request: DeleteManyRequest }>()
    );

    export const removeManySuccess = createAction(
        `${NAMESPACE} Remove Many Announcements ${SUCCESS}`,
        props<{ ids: string[] }>()
    );

    export const removeManyFailure = createAction(
        `${NAMESPACE} Remove Many Announcements ${FAILURE}`
    );
}
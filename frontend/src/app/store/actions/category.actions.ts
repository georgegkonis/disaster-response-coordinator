import { createAction, props } from '@ngrx/store';
import { CreateCategoryRequest } from '../../dto/requests/create-category-request.dto';
import { FAILURE, SUCCESS } from '../../constants/action-types';
import { Category } from '../../models/category.model';
import { LoadCategoriesRequest } from '../../dto/requests/load-categories-request.dto';
import { UpdateCategoryRequest } from '../../dto/requests/update-category-request.dto';
import { DeleteManyRequest } from '../../dto/requests/delete-many-request.dto';

export namespace CategoryActions {

    const NAMESPACE: string = '[CATEGORIES]';

    export const load = createAction(
        `${NAMESPACE} Load Categories`,
        props<{ request: LoadCategoriesRequest }>()
    );

    export const loadSuccess = createAction(
        `${NAMESPACE} Load Categories ${SUCCESS}`,
        props<{ categories: Category[] }>()
    );

    export const loadFailure = createAction(
        `${NAMESPACE} Load Categories ${FAILURE}`
    );

    export const create = createAction(
        `${NAMESPACE} Create Category`,
        props<{ request: CreateCategoryRequest }>()
    );

    export const createSuccess = createAction(
        `${NAMESPACE} Create Category ${SUCCESS}`,
        props<{ category: Category }>()
    );

    export const createFailure = createAction(
        `${NAMESPACE} Create Category ${FAILURE}`
    );

    export const update = createAction(
        `${NAMESPACE} Update Category`,
        props<{ id: string, request: UpdateCategoryRequest }>()
    );

    export const updateSuccess = createAction(
        `${NAMESPACE} Update Category ${SUCCESS}`,
        props<{ category: Category }>()
    );

    export const updateFailure = createAction(
        `${NAMESPACE} Update Category ${FAILURE}`
    );

    export const remove = createAction(
        `${NAMESPACE} Remove Category`,
        props<{ id: string }>()
    );

    export const removeSuccess = createAction(
        `${NAMESPACE} Remove Category ${SUCCESS}`,
        props<{ id: string }>()
    );

    export const removeFailure = createAction(
        `${NAMESPACE} Remove Category ${FAILURE}`
    );

    export const removeMany = createAction(
        `${NAMESPACE} Remove Many Categories`,
        props<{ request: DeleteManyRequest }>()
    );

    export const removeManySuccess = createAction(
        `${NAMESPACE} Remove Many Categories ${SUCCESS}`,
        props<{ ids: string[] }>()
    );

    export const removeManyFailure = createAction(
        `${NAMESPACE} Remove Many Categories ${FAILURE}`
    );

    export const reset = createAction(
        `${NAMESPACE} Reset`
    );
}
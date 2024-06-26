import { createAction, props } from '@ngrx/store';
import { CreateCategoryRequest } from '../../dto/requests/create-category-request.dto';
import { FAILURE, SUCCESS } from '../../constants/action-types';
import { Category } from '../../models/category.model';
import { LoadCategoriesRequest } from '../../dto/requests/load-categories-request.dto';
import { UpdateCategoryRequest } from '../../dto/requests/update-category-request.dto';

const NAMESPACE: string = '[CATEGORIES]';

export namespace CategoryActions {

    //#region Load Categories

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

    //#endregion

    //#region Create Category

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

    //#endregion

    //#region Update Category

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

    //#endregion

    //#region Delete Category

    export const $delete = createAction(
        `${NAMESPACE} Delete Category`,
        props<{ id: string }>()
    );

    export const deleteSuccess = createAction(
        `${NAMESPACE} Delete Category ${SUCCESS}`,
        props<{ id: string }>()
    );

    export const deleteFailure = createAction(
        `${NAMESPACE} Delete Category ${FAILURE}`
    );

    //#endregion

    //#region Delete Categories

    export const deleteMany = createAction(
        `${NAMESPACE} Delete Categories`,
        props<{ ids: string[] }>()
    );

    export const deleteManySuccess = createAction(
        `${NAMESPACE} Delete Categories ${SUCCESS}`,
        props<{ ids: string[] }>()
    );

    export const deleteManyFailure = createAction(
        `${NAMESPACE} Delete Categories ${FAILURE}`
    );

    //#endregion

    //#region Reset

    export const reset = createAction(
        `${NAMESPACE} Reset`
    );

    //#endregion
}
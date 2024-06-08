import { createAction, props } from '@ngrx/store';
import { CreateCategoryRequest } from '../../dto/requests/create-category-request.dto';
import { Category } from '../../models/category.model';
import { CreateItemRequest } from '../../dto/requests/create-item-request.dto';
import { Item } from '../../models/item.model';
import { LoadCategoriesRequest } from '../../dto/requests/load-categories-request.dto';
import { LoadItemsRequest } from '../../dto/requests/load-items-request.dto';
import { UpdateItemRequest } from '../../dto/requests/update-item-request.dto';
import { FAILURE, SUCCESS } from '../../constants/action-types';
import { DeleteManyRequest } from '../../dto/requests/delete-many-request.dto';
import { UpdateCategoryRequest } from '../../dto/requests/update-category-request.dto';

export namespace WarehouseActions {

    const NAMESPACE: string = '[WAREHOUSE]';

    export const upload = createAction(
        `${NAMESPACE} Upload Warehouse`,
        props<{ file: File }>()
    );

    export const uploadSuccess = createAction(
        `${NAMESPACE} Upload Warehouse ${SUCCESS}`
    );

    export const uploadFailure = createAction(
        `${NAMESPACE} Upload Warehouse ${FAILURE}`
    );

    export const clear = createAction(
        `${NAMESPACE} Clear Warehouse`
    );

    export const clearSuccess = createAction(
        `${NAMESPACE} Clear Warehouse ${SUCCESS}`
    );

    export const clearFailure = createAction(
        `${NAMESPACE} Clear Warehouse ${FAILURE}`
    );
}

export namespace CategoryActions {

    const NAMESPACE: string = '[CATEGORIES]';

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
}

export namespace ItemActions {

    const NAMESPACE: string = '[ITEMS]';

    export const create = createAction(
        `${NAMESPACE} Create Item`,
        props<{ request: CreateItemRequest }>()
    );

    export const createSuccess = createAction(
        `${NAMESPACE} Create Item ${SUCCESS}`,
        props<{ item: Item }>()
    );

    export const createFailure = createAction(
        `${NAMESPACE} Create Item ${FAILURE}`
    );

    export const load = createAction(
        `${NAMESPACE} Load Items`,
        props<{ request: LoadItemsRequest }>()
    );

    export const loadSuccess = createAction(
        `${NAMESPACE} Load Items ${SUCCESS}`,
        props<{ items: Item[] }>()
    );

    export const loadFailure = createAction(
        `${NAMESPACE} Load Items ${FAILURE}`
    );

    export const update = createAction(
        `${NAMESPACE} Update Item`,
        props<{ id: string, request: UpdateItemRequest }>()
    );

    export const updateSuccess = createAction(
        `${NAMESPACE} Update Item ${SUCCESS}`,
        props<{ item: Item }>()
    );

    export const updateFailure = createAction(
        `${NAMESPACE} Update Item ${FAILURE}`
    );

    export const remove = createAction(
        `${NAMESPACE} Remove Item`,
        props<{ id: string }>()
    );

    export const removeSuccess = createAction(
        `${NAMESPACE} Remove Item ${SUCCESS}`,
        props<{ id: string }>()
    );

    export const removeFailure = createAction(
        `${NAMESPACE} Remove Item ${FAILURE}`
    );

    export const removeMany = createAction(
        `${NAMESPACE} Remove Many Items`,
        props<{ request: DeleteManyRequest }>()
    );

    export const removeManySuccess = createAction(
        `${NAMESPACE} Remove Many Items ${SUCCESS}`,
        props<{ ids: string[] }>()
    );

    export const removeManyFailure = createAction(
        `${NAMESPACE} Remove Many Items ${FAILURE}`
    );
}

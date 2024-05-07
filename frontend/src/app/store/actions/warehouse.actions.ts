import { createAction, props } from '@ngrx/store';
import { CreateCategoryRequest } from '../../dto/requests/create-category-request.dto';
import { Category } from '../../models/category.model';
import { CreateItemRequest } from '../../dto/requests/create-item-request.dto';
import { Item } from '../../models/item.model';
import { GetCategoriesRequest } from '../../dto/requests/get-categories-request.dto';
import { GetItemsRequest } from '../../dto/requests/get-items-request.dto';
import { UpdateItemQuantityRequest } from '../../dto/requests/update-item-quantity-request.dto';

const SUCCESS: string = '[Success]';
const FAILURE: string = '[Failure]';
const NAMESPACE: string = '[Warehouse]';

export namespace WarehouseActions {


    //#region Upload

    export const upload = createAction(
        `${NAMESPACE} Upload`,
        props<{ file: File }>()
    );

    export const uploadSuccess = createAction(
        `${NAMESPACE}/${SUCCESS} Upload`
    );

    export const uploadFailure = createAction(
        `${NAMESPACE}/${FAILURE} Upload`
    );

    //#endregion

    //#region Create Category

    export const createCategory = createAction(
        `${NAMESPACE} Create Category`,
        props<{ request: CreateCategoryRequest }>()
    );

    export const createCategorySuccess = createAction(
        `${NAMESPACE}/${SUCCESS} Create Category`,
        props<{ category: Category }>()
    );

    export const createCategoryFailure = createAction(
        `${NAMESPACE}/${FAILURE} Create Category`
    );

    //#endregion

    //#region Create Item

    export const createItem = createAction(
        `${NAMESPACE} Create Item`,
        props<{ request: CreateItemRequest }>()
    );

    export const createItemSuccess = createAction(
        `${NAMESPACE}/${SUCCESS} Create Item`,
        props<{ item: Item }>()
    );

    export const createItemFailure = createAction(
        `${NAMESPACE}/${FAILURE} Create Item`
    );

    //#endregion

    //#region Get Categories

    export const getCategories = createAction(
        `${NAMESPACE} Get Categories`,
        props<{ request: GetCategoriesRequest }>()
    );

    export const getCategoriesSuccess = createAction(
        `${NAMESPACE}/${SUCCESS} Get Categories`,
        props<{ categories: Category[] }>()
    );

    export const getCategoriesFailure = createAction(
        `${NAMESPACE}/${FAILURE} Get Categories`
    );

    //#endregion

    //#region Get Items

    export const getItems = createAction(
        `${NAMESPACE} Get Items`,
        props<{ request: GetItemsRequest }>()
    );

    export const getItemsSuccess = createAction(
        `${NAMESPACE}/${SUCCESS} Get Items`,
        props<{ items: Item[] }>()
    );

    export const getItemsFailure = createAction(
        `${NAMESPACE}/${FAILURE} Get Items`
    );

    //#endregion

    //#region Update Item Quantity

    export const updateItemQuantity = createAction(
        `${NAMESPACE} Update Item Quantity`,
        props<{ itemId: string, request: UpdateItemQuantityRequest }>()
    );

    export const updateItemQuantitySuccess = createAction(
        `${NAMESPACE}/${SUCCESS} Update Item Quantity`,
        props<{ item: Item }>()
    );

    export const updateItemQuantityFailure = createAction(
        `${NAMESPACE}/${FAILURE} Update Item Quantity`
    );

    //#endregion

    //#region Delete All

    export const deleteAll = createAction(
        `${NAMESPACE} Delete All`
    );

    export const deleteAllSuccess = createAction(
        `${NAMESPACE}/${SUCCESS} Delete All`
    );

    export const deleteAllFailure = createAction(
        `${NAMESPACE}/${FAILURE} Delete All`
    );

    //#endregion
}

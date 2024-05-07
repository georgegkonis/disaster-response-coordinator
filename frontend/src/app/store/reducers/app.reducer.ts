import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import { Item } from '../../models/item.model';
import { Category } from '../../models/category.model';
import { WarehouseActions } from '../actions/warehouse.actions';
import { UserActions } from '../actions/user.actions';
import { AuthActions } from '../actions/auth.actions';

export interface AppState {
    user: User | null;
    users: User[];
    items: Item[];
    categories: Category[];
}

export const initialState: AppState = {
    user: null,
    users: [],
    items: [],
    categories: []
};

export const appReducer = createReducer(
    initialState,

    //#region Auth

    on(AuthActions.logoutSuccess, (state) => update(state, initialState)),

    //#endregion

    //#region User

    on(UserActions.getAllSuccess, (state, { users }) => update(state, { users })),
    on(UserActions.getMeSuccess, (state, { user }) => update(state, { user })),
    on(UserActions.updateMeSuccess, (state, { user }) => update(state, { user })),

    //#endregion

    //#region Warehouse

    on(WarehouseActions.getCategoriesSuccess, (state, { categories }) => update(state, { categories })),
    on(WarehouseActions.getItemsSuccess, (state, { items }) => update(state, { items })),
    on(WarehouseActions.createCategorySuccess, (state, { category }) => update(state, { categories: [...state.categories, category] })),
    on(WarehouseActions.createItemSuccess, (state, { item }) => update(state, { items: [...state.items, item] })),
    on(WarehouseActions.updateItemQuantitySuccess, (state, { item }) => update(state, { items: state.items.map(i => i.id === item.id ? item : i) })),
    on(WarehouseActions.deleteAllSuccess, (state) => update(state, { items: [], categories: [] }))

    //#endregion
);

function update(state: AppState, changes: Partial<AppState>) {
    return { ...state, ...changes };
}

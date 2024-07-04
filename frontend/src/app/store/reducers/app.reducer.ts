import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import { Item } from '../../models/item.model';
import { Category } from '../../models/category.model';
import { AuthActions } from '../actions/auth.actions';
import { Announcement } from '../../models/announcement.model';
import { AnnouncementsActions } from '../actions/announcements.actions';
import { ItemActions } from '../actions/item.actions';
import { CategoryActions } from '../actions/category.actions';
import { UserActions } from '../actions/user.actions';
import { Headquarters } from '../../models/headquarters.model';
import { HeadquartersActions } from '../actions/headquarters.actions';
import { ItemOffer } from '../../models/item-offer.model';
import { ItemRequest } from '../../models/item-request.model';
import { ItemOfferActions } from '../actions/item-offer.actions';
import { ItemRequestActions } from '../actions/item-request.actions';

export interface AppState {
    user: User | null;
    users: User[];
    items: Item[];
    categories: Category[];
    announcements: Announcement[];
    headquarters: Headquarters[];
    itemOffers: ItemOffer[];
    itemRequests: ItemRequest[];
}

const initialState: AppState = {
    user: null,
    users: [],
    items: [],
    categories: [],
    announcements: [],
    headquarters: [],
    itemOffers: [],
    itemRequests: []
};

const reducer = createReducer(
    initialState,

    on(AuthActions.logoutSuccess, (state) => update(state, initialState)),

    //#region User

    on(UserActions.loadMeSuccess, (state, { user }) => update(state, { user })),

    on(UserActions.updateMeSuccess, (state, { user }) => update(state, { user })),

    on(UserActions.updateMyLocationSuccess, (state, { location }) => update(state, { user: { ...state.user!, location } })),

    on(UserActions.updateMyInventorySuccess, (state, { user }) => update(state, { user })),

    on(UserActions.loadSuccess, (state, { users }) => update(state, { users })),

    on(UserActions.createSuccess, (state, { user }) => update(state, { users: [...state.users, user] })),

    on(UserActions.updateSuccess, (state, { user }) => update(state, { users: replaceInArray(state.users, user) })),

    on(UserActions.deleteSuccess, (state, { id }) => update(state, { users: deleteFromArray(state.users, id) })),

    on(UserActions.reset, (state) => update(state, { users: [] })),

    //#endregion

    //#region Announcements

    on(AnnouncementsActions.loadSuccess, (state, { announcements }) => update(state, { announcements })),

    on(AnnouncementsActions.reset, (state) => update(state, { announcements: [] })),

    //#endregion

    //#region Categories

    on(CategoryActions.loadSuccess, (state, { categories }) => update(state, { categories })),

    on(CategoryActions.reset, (state) => update(state, { categories: [] })),

    //#endregion

    //#region Items

    on(ItemActions.loadSuccess, (state, { items }) => update(state, { items })),

    on(ItemActions.reset, (state) => update(state, { items: [] })),

    //#endregion

    //#region Headquarters

    on(HeadquartersActions.loadSuccess, (state, { headquarters }) => update(state, { headquarters })),

    on(HeadquartersActions.reset, (state) => update(state, { headquarters: [] })),

    //#endregion

    //#region Item offers

    on(ItemOfferActions.loadSuccess, (state, { itemOffers }) => update(state, { itemOffers })),

    on(ItemOfferActions.loadMineSuccess, (state, { itemOffers }) => update(state, { itemOffers })),

    on(ItemOfferActions.createSuccess, (state, { itemOffer }) => update(state, { itemOffers: [...state.itemOffers, itemOffer] })),

    on(ItemOfferActions.updateStatusSuccess, (state, { itemOffer }) => update(state, { itemOffers: replaceInArray(state.itemOffers, itemOffer) })),

    on(ItemOfferActions.deleteSuccess, (state, { id }) => update(state, { itemOffers: deleteFromArray(state.itemOffers, id) })),

    on(ItemOfferActions.reset, (state) => update(state, { itemOffers: [] })),

    //#endregion

    //#region Item requests

    on(ItemRequestActions.loadSuccess, (state, { itemRequests }) => update(state, { itemRequests })),

    on(ItemRequestActions.loadMineSuccess, (state, { itemRequests }) => update(state, { itemRequests })),

    on(ItemRequestActions.createSuccess, (state, { itemRequest }) => update(state, { itemRequests: [...state.itemRequests, itemRequest] })),

    on(ItemRequestActions.updateStatusSuccess, (state, { itemRequest }) => update(state, { itemRequests: replaceInArray(state.itemRequests, itemRequest) })),

    on(ItemRequestActions.deleteSuccess, (state, { id }) => update(state, { itemRequests: deleteFromArray(state.itemRequests, id) })),

    on(ItemRequestActions.reset, (state) => update(state, { itemRequests: [] }))

    //#endregion
);

export function appReducer(state: AppState | undefined, action: any) {
    return reducer(state, action);
}

function update(state: AppState, changes: Partial<AppState>) {
    return { ...state, ...changes };
}

function replaceInArray<T extends { id: string }>(array: T[], newItem: T): T[] {
    return array.map((item) => (item.id === newItem.id ? newItem : item));
}

function deleteFromArray<T extends { id: string }>(array: T[], id: string): T[] {
    return array.filter((i) => i.id !== id);
}

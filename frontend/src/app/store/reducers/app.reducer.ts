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

export const initialState: AppState = {
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

    on(UserActions.loadMeSuccess, (state, { user }) => update(state, { user })),
    on(UserActions.updateMeSuccess, (state, { user }) => update(state, { user })),

    on(UserActions.loadSuccess, (state, { users }) => update(state, { users })),
    on(UserActions.reset, (state) => update(state, { users: [] })),

    on(AnnouncementsActions.loadSuccess, (state, { announcements }) => update(state, { announcements })),
    on(AnnouncementsActions.reset, (state) => update(state, { announcements: [] })),

    on(CategoryActions.loadSuccess, (state, { categories }) => update(state, { categories })),
    on(CategoryActions.reset, (state) => update(state, { categories: [] })),

    on(ItemActions.loadSuccess, (state, { items }) => update(state, { items })),
    on(ItemActions.reset, (state) => update(state, { items: [] })),

    on(HeadquartersActions.loadSuccess, (state, { headquarters }) => update(state, { headquarters })),
    on(HeadquartersActions.reset, (state) => update(state, { headquarters: [] })),

    on(ItemOfferActions.loadSuccess, (state, { itemOffers }) => update(state, { itemOffers })),
    on(ItemOfferActions.reset, (state) => update(state, { itemOffers: [] })),

    on(ItemRequestActions.loadSuccess, (state, { itemRequests }) => update(state, { itemRequests })),
    on(ItemRequestActions.reset, (state) => update(state, { itemRequests: [] }))
);

export function appReducer(state: AppState | undefined, action: any) {
    return reducer(state, action);
}

function update(state: AppState, changes: Partial<AppState>) {
    return { ...state, ...changes };
}

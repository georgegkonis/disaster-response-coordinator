import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import { Item } from '../../models/item.model';
import { Category } from '../../models/category.model';
import { AuthActions } from '../actions/auth.actions';
import { Announcement } from '../../models/announcement.model';
import { AnnouncementsActions } from '../actions/announcements.actions';
import { ItemActions } from '../actions/item.actions';
import { CategoryActions } from '../actions/category.actions';

export interface AppState {
    user: User | null;
    users: User[];
    items: Item[];
    categories: Category[];
    announcements: Announcement[];
}

export const initialState: AppState = {
    user: null,
    users: [],
    items: [],
    categories: [],
    announcements: []
};

const reducer = createReducer(
    initialState,

    on(AuthActions.logoutSuccess, (state) => update(state, initialState)),

    on(AnnouncementsActions.loadSuccess, (state, { announcements }) => update(state, { announcements })),
    on(AnnouncementsActions.reset, (state) => update(state, { announcements: [] })),

    on(CategoryActions.loadSuccess, (state, { categories }) => update(state, { categories })),
    on(CategoryActions.reset, (state) => update(state, { categories: [] })),

    on(ItemActions.loadSuccess, (state, { items }) => update(state, { items })),
    on(ItemActions.reset, (state) => update(state, { items: [] }))
);

export function appReducer(state: AppState | undefined, action: any) {
    return reducer(state, action);
}

function update(state: AppState, changes: Partial<AppState>) {
    return { ...state, ...changes };
}

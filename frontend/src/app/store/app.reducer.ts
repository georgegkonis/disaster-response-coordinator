import { createReducer, on } from '@ngrx/store';
import { AuthActions, CategoryActions, ComStoreActions, UserActions } from './app.actions';
import { User } from '../models/user.model';
import { Role } from '../enums/user-role.enum';
import { Category, ComStore } from '../models/app.model';

export interface AppState {
    isAuthenticated: boolean;
    currentUser: User | null;
    currentRole: Role | null;
    allUsers: User[];
    stores: ComStore[];
    categories: Category[];
}

export const initialState: AppState = {
    isAuthenticated: false,
    currentUser: null,
    currentRole: null,
    allUsers: [],
    stores: [],
    categories: []
};

export const appReducer = createReducer(
    initialState,

    on(AuthActions.loginSuccess, (state, { role }) =>
        updateState(state, { isAuthenticated: true, currentRole: role })),

    on(UserActions.getAllSuccess, (state, { users }) =>
        updateState(state, { allUsers: users })),

    on(UserActions.getCurrentSuccess, (state, user) =>
        updateState(state, { currentUser: user })),

    on(UserActions.updateCurrentSuccess, (state, user) =>
        updateState(state, { currentUser: user })),

    on(ComStoreActions.getAllSuccess, (state, { stores }) =>
        updateState(state, { stores: [...stores] })),

    on(CategoryActions.getAllSuccess, (state, { categories }) =>
        updateState(state, { categories: [...categories] })),

    on(AuthActions.logoutSuccess, () => initialState)
);

function updateState(state: AppState, changes: Partial<AppState>) {
    return { ...state, ...changes };
}

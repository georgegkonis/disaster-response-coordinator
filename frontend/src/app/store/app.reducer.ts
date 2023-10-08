import { createReducer, on } from '@ngrx/store';
import { AuthActions, resetState, UserActions } from './app.actions';
import { User } from '../models/user.model';

export interface AppState {
    isAuthenticated: boolean;
    currentUser: User | null;
    allUsers: Array<User>;
}

export const initialState: AppState = {
    isAuthenticated: false,
    currentUser: null,
    allUsers: []
};

export const appReducer = createReducer(
    initialState,

    on(AuthActions.loginSuccess, (state, { token }) =>
        updateState(state, { isAuthenticated: true })),

    on(AuthActions.logoutSuccess, (state) =>
        updateState(state, { isAuthenticated: false })),

    on(UserActions.getCurrentSuccess, (state, user) =>
        updateState(state, { currentUser: user })),

    on(UserActions.getAllSuccess, (state, { users }) =>
        updateState(state, { allUsers: users })),

    on(resetState, () => initialState)
);

function updateState(state: AppState, changes: Partial<AppState>) {
    return { ...state, ...changes };
}

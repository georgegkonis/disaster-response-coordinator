import { createReducer, on } from '@ngrx/store';
import { AuthActions, UserActions } from './app.actions';
import { User } from '../models/user.model';
import { Role } from '../enums/user-role.enum';

export interface AppState {
    isAuthenticated: boolean;
    currentUser: User | null;
    currentRole: Role | null;
    allUsers: Array<User>;
}

export const initialState: AppState = {
    isAuthenticated: false,
    currentUser: null,
    currentRole: null,
    allUsers: []
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

    on(AuthActions.logoutSuccess, () => initialState)
);

function updateState(state: AppState, changes: Partial<AppState>) {
    return { ...state, ...changes };
}

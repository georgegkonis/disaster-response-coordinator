import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import { AuthActions, UserActions } from './app.actions';

export interface AppState {
    user: User | null;
    users: User[];
}

export const initialState: AppState = {
    user: null,
    users: []
};

export const appReducer = createReducer(
    initialState,

    on(AuthActions.logoutSuccess, (state) => update(state, initialState)),

    on(UserActions.getAllSuccess, (state, { users }) => update(state, { users })),

    on(UserActions.getMeSuccess, (state, { user }) => update(state, { user })),

    on(UserActions.updateMeSuccess, (state, { user }) => update(state, { user }))
);

function update(state: AppState, changes: Partial<AppState>) {
    return { ...state, ...changes };
}

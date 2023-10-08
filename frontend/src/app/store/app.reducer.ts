import { createReducer, on } from '@ngrx/store';
import { AuthActions, resetState } from './app.actions';

export interface AppState {
    isAuthenticated?: boolean;
}

export const initialState: AppState = {
    isAuthenticated: false
};

export const appReducer = createReducer(
    initialState,

    on(AuthActions.loginSuccess, (state, { token }) =>
        updateState(state, { isAuthenticated: true })),

    on(AuthActions.logoutSuccess, (state) =>
        updateState(state, { isAuthenticated: false })),

    on(resetState, () => initialState)
);

function updateState(state: AppState, changes: Partial<AppState>) {
    return { ...state, ...changes };
}

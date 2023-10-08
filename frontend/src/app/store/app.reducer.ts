import { createReducer, on } from '@ngrx/store';
import { AuthActions, resetState } from './app.actions';

export interface AppState {
    token: string | null;
}

export const initialState: AppState = {
    token: null
};

export const appReducer = createReducer(
    initialState,

    on(AuthActions.loginSuccess, (state, { token }) => ({ ...state, token })),

    on(AuthActions.logoutSuccess, (state) => ({ ...state, token: null })),

    on(resetState, () => initialState)
);

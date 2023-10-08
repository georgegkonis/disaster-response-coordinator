import { createReducer, on } from '@ngrx/store';
import { AuthActions, resetState } from './app.actions';

export interface AppState {
    token: object | null;
    error: any;
}

const initialState: AppState = {
    token: null,
    error: null
};

export const appReducer = createReducer(
    initialState,

    on(AuthActions.loginSuccess, (state, { token }) => ({ ...state, token })),
    on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error })),

    on(resetState, () => initialState)
);

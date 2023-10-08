import { createReducer, on } from '@ngrx/store';
import { AuthActions, MessageActions, resetState } from './app.actions';
import { Message } from 'primeng/api';

export interface AppState {
    message: Message | null;
}

const initialState: AppState = {
    message: null
};

export const appReducer = createReducer(
    initialState,

    on(AuthActions.loginSuccess, (state) => ({ ...state, message: { severity: 'success', summary: 'Login successful' } })),
    on(AuthActions.loginFailure, (state) => ({ ...state, message: { severity: 'error', summary: 'Login failed' } })),

    on(MessageActions.set, (state, message) => ({ ...state, message })),
    on(MessageActions.clear, (state) => ({ ...state, message: null })),

    on(resetState, () => initialState)
);

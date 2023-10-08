import { createReducer, on } from '@ngrx/store';
import { resetState } from './app.actions';

export interface AppState {}

const initialState: AppState = {};

export const appReducer = createReducer(
    initialState,

    on(resetState, () => initialState)
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

const appState = createFeatureSelector<AppState>('app');

export const selectMessage = createSelector(
    appState,
    (state: AppState) => state.message
);

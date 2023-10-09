import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

const appState = createFeatureSelector<AppState>('app');

export const selectIsAuthenticated = createSelector(
    appState,
    (state: AppState) => state.isAuthenticated
);

export const selectCurrentUser = createSelector(
    appState,
    (state: AppState) => state.currentUser
);

export const selectCurrentRole = createSelector(
    appState,
    (state: AppState) => state.currentRole
);

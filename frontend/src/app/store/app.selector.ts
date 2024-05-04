import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

const appStateSelector = createFeatureSelector<AppState>('app');

export const isAuthenticatedSelector = createSelector(
    appStateSelector,
    (state: AppState) => state.isAuthenticated
);

export const userSelector = createSelector(
    appStateSelector,
    (state: AppState) => state.currentUser
);

export const roleSelector = createSelector(
    appStateSelector,
    (state: AppState) => state.currentRole
);

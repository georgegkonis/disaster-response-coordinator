import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

const selectAppState = createFeatureSelector<AppState>('app');

export const selectIsAuthenticated = createSelector(
    selectAppState,
    (state: AppState) => state.isAuthenticated
);

export const selectCurrentUser = createSelector(
    selectAppState,
    (state: AppState) => state.currentUser
);

export const selectCurrentRole = createSelector(
    selectAppState,
    (state: AppState) => state.currentRole
);

export const selectAllUsers = createSelector(
    selectAppState,
    (state: AppState) => state.allUsers
);

export const selectStores = createSelector(
    selectAppState,
    (state: AppState) => state.stores
);

export const selectCategories = createSelector(
    selectAppState,
    (state: AppState) => state.categories
);

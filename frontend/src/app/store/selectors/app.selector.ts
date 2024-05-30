import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers/app.reducer';

const appStateSelector = createFeatureSelector<AppState>('app');

export const userSelector = createSelector(
    appStateSelector,
    (state: AppState) => state.user
);

export const categoriesSelector = createSelector(
    appStateSelector,
    (state: AppState) => state.categories
);

export const itemsSelector = createSelector(
    appStateSelector,
    (state: AppState) => state.items
);

export const announcementsSelector = createSelector(
    appStateSelector,
    (state: AppState) => state.announcements
);

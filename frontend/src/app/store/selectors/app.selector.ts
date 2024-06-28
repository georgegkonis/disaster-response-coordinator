import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers/app.reducer';

const appStateSelector = createFeatureSelector<AppState>('app');

export const userSelector = createSelector(
    appStateSelector,
    (state: AppState) => state.user
);

export const usersSelector = createSelector(
    appStateSelector,
    (state: AppState) => [...state.users]
);

export const categoriesSelector = createSelector(
    appStateSelector,
    (state: AppState) => [...state.categories]
);

export const itemsSelector = createSelector(
    appStateSelector,
    (state: AppState) => [...state.items]
);

export const announcementsSelector = createSelector(
    appStateSelector,
    (state: AppState) => [...state.announcements]
);

export const headquartersSelector = createSelector(
    appStateSelector,
    (state: AppState) => [...state.headquarters]
);

export const itemOffersSelector = createSelector(
    appStateSelector,
    (state: AppState) => [...state.itemOffers]
);

export const itemRequestsSelector = createSelector(
    appStateSelector,
    (state: AppState) => [...state.itemRequests]
);
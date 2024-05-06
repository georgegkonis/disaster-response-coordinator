import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

const appStateSelector = createFeatureSelector<AppState>('app');

export const userSelector = createSelector(
    appStateSelector,
    (state: AppState) => state.user
);

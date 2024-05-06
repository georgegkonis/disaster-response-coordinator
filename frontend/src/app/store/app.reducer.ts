import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import { UserRole } from '../enums/user-role.enum';
import { AuthActions } from './app.actions';

export interface AppState {
    user: User | null;
}

export const initialState: AppState = {
    user: null
};

export const appReducer = createReducer(
    initialState,

    on(AuthActions.logoutSuccess, (state) => update(state, initialState))
);

function update(state: AppState, changes: Partial<AppState>) {
    return { ...state, ...changes };
}

import { createReducer } from '@ngrx/store';
import { User } from '../models/user.model';
import { UserRole } from '../enums/user-role.enum';

export interface AppState {
    isAuthenticated: boolean;
    currentUser: User | null;
    currentRole: UserRole | null;
}

export const initialState: AppState = {
    isAuthenticated: false,
    currentUser: null,
    currentRole: null
};

export const appReducer = createReducer(
    initialState
);

function updateState(state: AppState, changes: Partial<AppState>) {
    return { ...state, ...changes };
}

import { createReducer } from '@ngrx/store';
import { User } from '../models/user.model';
import { Role } from '../enums/user-role.enum';

export interface AppState {
    isAuthenticated: boolean;
    currentUser: User | null;
    currentRole: Role | null;
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

import { User } from './user.model';

export interface LoginResponse {
    token: string;
}

export interface GetUsersResponse {
    users: Array<User>;
}
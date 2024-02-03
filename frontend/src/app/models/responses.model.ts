import { User } from './user.model';
import { Role } from '../enums/user-role.enum';

export interface LoginResponse {
    role: Role;
}

export interface GetUsersResponse {
    users: Array<User>;
}
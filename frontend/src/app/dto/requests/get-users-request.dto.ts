import { Role } from '../../enums/user-role.enum';

export interface GetUsersRequest {
    role?: Role;
}
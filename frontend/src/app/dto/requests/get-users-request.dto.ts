import { UserRole } from '../../enums/user-role.enum';

export interface GetUsersRequest {
    role?: UserRole;
}
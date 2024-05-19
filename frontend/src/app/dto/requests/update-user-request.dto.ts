import { UserDetails } from '../../models/user-details.model';

export interface UpdateUserRequest {
    username?: string;
    password?: string;
    details?: UserDetails;
}
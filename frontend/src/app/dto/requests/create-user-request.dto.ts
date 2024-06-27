import { UserDetails } from '../../models/user-details.model';

export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
    role: string;
    details?: UserDetails;
}
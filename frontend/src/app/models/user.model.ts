import { UserRole } from '../enums/user-role.enum';

export interface User {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    details?: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
    };
    location?: {
        latitude: number;
        longitude: number;
    };
}

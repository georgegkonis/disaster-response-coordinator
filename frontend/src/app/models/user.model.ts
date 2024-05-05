import { Role } from '../enums/user-role.enum';

export interface User {
    id: string;
    username: string;
    email: string;
    role: Role;
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

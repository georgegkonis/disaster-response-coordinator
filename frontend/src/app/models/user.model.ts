import { UserRole } from '../enums/user-role.enum';
import { MapLocation } from './map-location.model';

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
    location?: MapLocation;
}

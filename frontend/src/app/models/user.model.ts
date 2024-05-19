import { UserRole } from '../enums/user-role.enum';
import { MapLocation } from './map-location.model';
import { UserDetails } from './user-details.model';

export interface User {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    details?: UserDetails;
    location?: MapLocation;
}

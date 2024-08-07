import { UserRole } from '../enums/user-role.enum';
import { MapLocation } from './map-location.model';
import { UserDetails } from './user-details.model';

export interface User {
    id: string;
    username: string;
    password?: string;
    email: string;
    role: UserRole;
    details?: UserDetails;
    createdAt: Date;
    updatedAt: Date;
    location: MapLocation;
    inventory?: Map<string, number>;
}

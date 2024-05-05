export interface UpdateUserRequest {
    username?: string;
    password?: string;
    details?: {
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
    };
}
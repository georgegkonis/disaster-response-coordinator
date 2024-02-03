export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export interface UpdateUserRequest {
    username?: string;
    password?: string;
}
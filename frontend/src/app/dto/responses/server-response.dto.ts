export interface ServerResponse<T> {
    status: string;
    message: string;
    data?: T;
}
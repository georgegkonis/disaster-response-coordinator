export interface ClientError {
    error: any;
    message: string;
    status: number;
    timestamp: string;
    path: string;
}
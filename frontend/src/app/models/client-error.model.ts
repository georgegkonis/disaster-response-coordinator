export interface ServerError {
    status: number;
    message: string;
    additionalInfo?: Array<string>;
}
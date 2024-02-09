import AppError from './app-error';
import { StatusCode } from '../enums/status-code.enum';

export default class UnauthorizedError extends AppError {

    constructor(message: string) {
        super(message, StatusCode.UNAUTHORIZED);
    }
}
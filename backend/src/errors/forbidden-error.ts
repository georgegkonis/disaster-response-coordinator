import AppError from './app-error';
import { StatusCode } from '../enums/status-code.enum';

export default class ForbiddenError extends AppError {

    constructor(message: string) {
        super(message, StatusCode.FORBIDDEN);
    }
}
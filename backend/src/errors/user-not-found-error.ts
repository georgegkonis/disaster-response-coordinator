import { StatusCode } from '../enums/status-code.enum';
import AppError from './app-error';

export default class UserNotFoundError extends AppError {
    constructor(id: string) {
        super(`User with ID '${id}' not found`, StatusCode.NOT_FOUND);
    }
}
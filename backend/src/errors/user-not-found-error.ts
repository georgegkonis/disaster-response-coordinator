import { StatusCode } from '../enums/status-code.enum';
import AppError from './app-error';

export default class UserNotFoundError extends AppError {
    constructor() {
        super('User not found', StatusCode.NOT_FOUND);
    }
}
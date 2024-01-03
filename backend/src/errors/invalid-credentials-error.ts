import { StatusCode } from '../enums/status-code.enum';
import AppError from './app-error';

export default class InvalidCredentialsError extends AppError {
    constructor() {
        super('Invalid username or password', StatusCode.UNAUTHORIZED);
    }
}
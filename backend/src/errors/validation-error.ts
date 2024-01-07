import { StatusCode } from '../enums/status-code.enum';
import AppError from './app-error';

export default class ValidationError extends AppError {
    constructor(public readonly messages: string[]) {
        super('Validation failed', StatusCode.BAD_REQUEST, messages);
    }
}
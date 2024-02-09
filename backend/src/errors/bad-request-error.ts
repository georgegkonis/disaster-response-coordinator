import AppError from './app-error';
import { StatusCode } from '../enums/status-code.enum';

export default class BadRequestError extends AppError {

    constructor(message: string, additionalInfo?: Array<string>) {
        super(message, StatusCode.BAD_REQUEST, additionalInfo);
    }
}
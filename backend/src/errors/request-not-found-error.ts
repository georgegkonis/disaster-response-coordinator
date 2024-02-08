import { StatusCode } from '../enums/status-code.enum';
import AppError from './app-error';

export default class RequestNotFoundError extends AppError {
    constructor(id: string) {
        super(`Request with id ${id} not found`, StatusCode.NOT_FOUND);
    }
}
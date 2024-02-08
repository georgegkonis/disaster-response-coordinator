import AppError from './app-error';
import { StatusCode } from '../enums/status-code.enum';

export default class ItemNotFoundError extends AppError {
    constructor(id: string) {
        super(`Item with ID '${id}' not found`, StatusCode.NOT_FOUND);
    }
}
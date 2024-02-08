import AppError from './app-error';
import { StatusCode } from '../enums/status-code.enum';

export default class CategoryNotFoundError extends AppError {
    constructor(id: string) {
        super(`Category with ID '${id}' not found`, StatusCode.NOT_FOUND);
    }
}
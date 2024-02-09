import AppError from './app-error';
import { StatusCode } from '../enums/status-code.enum';

export default class HeadquartersNotFoundError extends AppError {
    constructor(id: string) {
        super(`Headquarters with ID ${id} not found`, StatusCode.NOT_FOUND);
    }
}
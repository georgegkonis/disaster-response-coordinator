import { StatusCode } from '../enums/status-code.enum';
import AppError from './app-error';

export default class ItemOfferNotFoundError extends AppError {
    constructor(id: string) {
        super(`Item offer with ID ${id} not found`, StatusCode.NOT_FOUND);
    }
}
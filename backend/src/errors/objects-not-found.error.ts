import AppError from './app-error';
import { StatusCode } from '../enums/status-code.enum';

export default class ObjectsNotFoundError extends AppError {
    constructor(ids: string[], name: string = 'objects') {
        super(`One or more ${name} could not be found`, StatusCode.NOT_FOUND, ids);
    }
}
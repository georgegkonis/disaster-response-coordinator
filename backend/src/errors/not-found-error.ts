import { StatusCode } from '../enums/status-code.enum';
import AppError from './app-error';

export default class NotFoundError extends AppError {

    constructor(name: string, additionalInfo: string | string[]) {
        if (Array.isArray(additionalInfo)) {
            super(`Some ${name} could not be found`, StatusCode.NOT_FOUND, additionalInfo);
        } else {
            super(`The ${name} with ID '${additionalInfo}' could not be found`, StatusCode.NOT_FOUND);
        }
    }
}
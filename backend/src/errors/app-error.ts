import { StatusCode } from '../enums/status-code.enum';

export default class AppError extends Error {
    status: string;
    isOperational: boolean;

    constructor(
        public message: string,
        public statusCode: number = StatusCode.SERVER_ERROR,
        public additionalInfo?: Array<string>
    ) {
        super(message);
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}


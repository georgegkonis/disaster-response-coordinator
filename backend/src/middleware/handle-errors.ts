import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../enums/status-code.enum';
import AppError from '../errors/app-error';
 import { Status } from '../enums/status.enum';

export function handleErrors(
    err: AppError | any,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    err.status = err.status || Status.ERROR;
    err.statusCode = err.statusCode || StatusCode.SERVER_ERROR;

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            additionalInfo: err.additionalInfo
        });
    }

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
}
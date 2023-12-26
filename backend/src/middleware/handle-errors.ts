import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../enums/status-code.enum';
import { MongoErrorCodes } from '../constants/error-codes';
import AppError from '../errors/app-error';

export function handleErrors(
    err: AppError | any,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || StatusCode.SERVER_ERROR;

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
}
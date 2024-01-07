import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import AppError from '../errors/app-error';
import { StatusCode } from '../enums/status-code.enum';

export const validate = (schema: AnyZodObject) => (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    try {
        const parsedData = schema.parse({
            params: req.params,
            query: req.query,
            body: req.body
        });

        req.params = parsedData.params;
        req.query = parsedData.query;
        req.body = parsedData.body;

        next();
    } catch (err: any) {
        if (err instanceof ZodError) {
            let messages = err.errors.map(error => `${error.code}: ${error.message}`);

            const appError = new AppError(
                'Validation failed',
                StatusCode.BAD_REQUEST,
                messages
            );
            next(appError);
        }
        next(err);
    }
};


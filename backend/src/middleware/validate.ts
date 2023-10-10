import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import AppError from '../errors/app-error';
import { StatusCode } from '../enums/status-code.enum';

export const validate = (schema: AnyZodObject) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        schema.parse({
            params: req.params,
            query: req.query,
            body: req.body
        });

        next();
    } catch (err: any) {
        if (err instanceof ZodError) {
            let messages = err.errors.map(error => error.message);

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


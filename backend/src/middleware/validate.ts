import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { StatusCode } from '../enums/status-code.enum';

export const validate =
    (schema: AnyZodObject) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse({
                    params: req.params,
                    query: req.query,
                    body: req.body
                });

                next();
            } catch (err: any) {
                if (err instanceof ZodError) {
                    return res.status(StatusCode.BAD_REQUEST).json({
                        status: 'fail',
                        error: err.errors
                    });
                }
                next(err);
            }
        };


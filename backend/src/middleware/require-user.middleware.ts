import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/app-error';
import { StatusCode } from '../enums/status-code.enum';
import UnauthorizedError from '../errors/unauthorized-error';

export const requireUser = (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        if (!user) {
            return next(new UnauthorizedError('Invalid token or session has expired'));
        }
        next();
    } catch (err: any) {
        next(err);
    }
};


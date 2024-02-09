import { NextFunction, Request, Response } from 'express';
import { Role } from '../enums/role.enum';
import ForbiddenError from '../errors/forbidden-error';

export const restrictTo = (...allowedRoles: Role[]) => (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = res.locals.user;
    if (!allowedRoles.includes(user.role)) {
        return next(new ForbiddenError('You are not allowed to perform this action'));
    }

    next();
};


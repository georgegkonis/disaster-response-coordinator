import { NextFunction, Request, Response } from 'express';
import { findUserById } from '../services/user.service';
import AppError from '../errors/app-error';
import redisClient from '../config/redis.config';
import { verifyJwt } from '../utils/jwt';
import { StatusCode } from '../enums/status-code.enum';

export const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        // Get the token
        let accessToken;
        if (req.headers.authorization) {
            if (req.headers.authorization.startsWith('Bearer')) {
                accessToken = req.headers.authorization.split(' ')[1];
            } else if (req.cookies.accessToken) {
                accessToken = req.cookies.accessToken;
            }
        } else if (req.cookies.accessToken) {
            accessToken = req.cookies.accessToken;
        }

        if (!accessToken) {
            return next(new AppError('You are not logged in', StatusCode.UNAUTHORIZED));
        }

        // Validate Access Token
        const decoded = verifyJwt<{ sub: string }>(accessToken);

        if (!decoded) {
            return next(new AppError(`Invalid token or user doesn't exist`, StatusCode.UNAUTHORIZED));
        }

        // Check if user has a valid session
        const session = await redisClient.get(decoded.sub);

        if (!session) {
            return next(new AppError(`User session has expired`, StatusCode.UNAUTHORIZED));
        }

        // Check if user still exist
        const user = await findUserById(JSON.parse(session)._id);

        if (!user) {
            return next(new AppError(`User with that token no longer exist`, StatusCode.UNAUTHORIZED));
        }

        // This is really important (Helps us know if the user is logged in from other controllers)
        // You can do: (req.user or res.locals.user)
        res.locals.user = user;

        next();
    } catch (err: any) {
        next(err);
    }
};

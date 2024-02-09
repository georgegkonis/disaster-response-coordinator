import { NextFunction, Request, Response } from 'express';
import { getUser } from '../services/user.service';
import redisClient from '../config/redis.config';
import { verifyJwt } from '../utils/jwt';
import UnauthorizedError from '../errors/unauthorized-error';

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
            return next(new UnauthorizedError('You are not logged in'));
        }

        // Validate Access Token
        const decoded = verifyJwt<{ sub: string }>(accessToken);

        if (!decoded) {
            return next(new UnauthorizedError(`Invalid token or user doesn't exist`));
        }

        // Check if user has a valid session
        const session = await redisClient.get(decoded.sub);

        if (!session) {
            return next(new UnauthorizedError(`User session has expired`));
        }

        // Check if user still exist
        const user = await getUser(JSON.parse(session)._id);

        if (!user) {
            return next(new UnauthorizedError(`User with that token no longer exist`));
        }

        // This is really important (Helps us know if the user is logged in from other controllers)
        // You can do: (req.user or res.locals.user)
        res.locals.user = user;

        next();
    } catch (err: any) {
        next(err);
    }
};

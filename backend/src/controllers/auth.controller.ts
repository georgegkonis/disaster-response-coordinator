import config from 'config';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import { CreateUserInput, LoginUserInput } from '../schemas/user.schema';
import { createUser, findUser } from '../services/user.service';
import { StatusCode } from '../enums/status-code.enum';
import { MongoErrorCodes } from '../constants/mongo-error-codes';
import { signToken } from '../services/auth.service';
import InvalidCredentialsError from '../errors/invalid-credentials-error';
import { deleteUserCache } from '../services/cache.service';
import { Status } from '../enums/status.enum';

// Cookie options
const accessTokenCookieOptions: CookieOptions = {
    expires: new Date(Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000),
    maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax'
};

// Only set secure to true in production
if (process.env.NODE_ENV === 'production')
    accessTokenCookieOptions.secure = true;

export const registerHandler = async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        await createUser(req.body);

        res.status(StatusCode.CREATED).json({
            status: Status.SUCCESS,
            message: 'User created successfully'
        });
    } catch (err: any) {
        if (err.code === MongoErrorCodes.DUPLICATE_KEY) {
            err.message = 'Username or email already exists';
        }
        next(err);
    }
};

export const loginHandler = async (
    req: Request<{}, {}, LoginUserInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        // Get the user from the collection
        const user = await findUser({ username: req.body.username }, {}, true);

        // Check if user exist and password is correct
        if (!user || !(await user.comparePasswords(user.password, req.body.password))) {
            return next(new InvalidCredentialsError());
        }

        // Create an Access Token
        const { accessToken } = await signToken(user);

        // Send Access Token in Cookie
        res.cookie('accessToken', accessToken, accessTokenCookieOptions);
        res.cookie('loggedIn', true, { ...accessTokenCookieOptions, httpOnly: false });

        res.status(StatusCode.OK).json({
            status: Status.SUCCESS,
            message: 'Logged in successfully',
            data: { userRole: user.role }
        });
    } catch (err: any) {
        next(err);
    }
};

export const logoutHandler = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Clear the cookie
        res.clearCookie('accessToken');
        res.clearCookie('loggedIn');

        const userId = res.locals.user._id.toString();
        deleteUserCache(userId);

        res.status(StatusCode.OK).json({
            status: Status.SUCCESS,
            message: 'Logged out successfully'
        });
    } catch (err: any) {
        next(err);
    }
};


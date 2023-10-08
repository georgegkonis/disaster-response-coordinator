import config from 'config';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import { CreateUserInput, LoginUserInput } from '../schemas/user.schema';
import { createUser, findUser, signToken } from '../services/user.service';
import AppError from '../errors/app-error';
import { StatusCode } from '../enums/status-code.enum';
import { MongoErrorCodes } from '../constants/error-codes';

// Exclude this fields from the response
export const excludedFields = ['password'];

// Cookie options
const accessTokenCookieOptions: CookieOptions = {
    expires: new Date(
        Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
    ),
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
        const user = await createUser({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });

        res.status(StatusCode.CREATED).json({
            status: 'success',
            data: { user }
        });
    } catch (err: any) {
        if (err.code === MongoErrorCodes.DUPLICATE_KEY) {
            return res.status(StatusCode.CONFLICT).json({
                status: 'fail',
                message: 'Email/Username already exist'
            });
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
        const user = await findUser({ username: req.body.username });

        // Check if user exist and password is correct
        if (!user || !(await user.comparePasswords(user.password, req.body.password))) {
            return next(new AppError('Invalid username or password', StatusCode.UNAUTHORIZED));
        }

        // Create an Access Token
        const { accessToken } = await signToken(user);

        // Send Access Token in Cookie
        res.cookie('access_token', accessToken, accessTokenCookieOptions);
        res.cookie('logged_in', true, { ...accessTokenCookieOptions, httpOnly: false });

        // Send Access Token
        res.status(StatusCode.OK).json({
            status: 'success',
            access_token: accessToken
        });
    } catch (err: any) {
        next(err);
    }
};


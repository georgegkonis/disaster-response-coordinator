import { NextFunction, Request, Response } from 'express';
import { deleteUser, findAllUsers, findUserById, updateUser } from '../services/user.service';
import { StatusCode } from '../enums/status-code.enum';
import { UpdateUserInput } from '../schemas/user.schema';

interface RouteParamsId {
    id: string;
}

export const getMeHandler = (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        res.status(StatusCode.OK).json(user);
    } catch (err: any) {
        next(err);
    }
};

export const getUserHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await findUserById(req.params.id);
        res.status(StatusCode.OK).json(user);
    } catch (err: any) {
        next(err);
    }
};

export const getAllUsersHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await findAllUsers();
        res.status(StatusCode.OK).json(users);
    } catch (err: any) {
        next(err);
    }
};

export const updateUserHandler = async (
    req: Request<RouteParamsId, {}, UpdateUserInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        res.status(StatusCode.OK).json(user);
    } catch (err: any) {
        next(err);
    }
};

export const deleteUserHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await deleteUser(req.params.id);
        res.status(StatusCode.OK).json(user);
    } catch (err: any) {
        next(err);
    }
};


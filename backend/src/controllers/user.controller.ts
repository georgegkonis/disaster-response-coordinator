import { NextFunction, Request, Response } from 'express';
import { createUser, deleteUser, findUsers, getUser, updateUser } from '../services/user.service';
import { StatusCode } from '../enums/status-code.enum';
import { MongoErrorCodes } from '../constants/mongo-error-codes';
import { deleteUserCache, updateUserCache } from '../services/cache.service';
import { CreateUserInput, UpdateUserInput, UpdateUserInventoryInput, UpdateUserLocationInput } from '../schemas/user.schema';
import { Role } from '../enums/role.enum';
import ConflictError from '../errors/conflict.error';
import { getItem, updateItemQuantity } from '../services/item.service';

export const createUserHandler = async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await createUser(req.body);

        res.status(StatusCode.CREATED).json(user);
    } catch (err: any) {
        if (err.code === MongoErrorCodes.DUPLICATE_KEY) {
            err = new ConflictError('Username or email already exist');
        }
        next(err);
    }
};

export const getUsersHandler = async (
    req: Request<{ role?: Role }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await findUsers(req.query);

        res.status(StatusCode.OK).json(users);
    } catch (err: any) {
        next(err);
    }
};

export const getUserHandler = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await getUser(req.params.id);

        res.status(StatusCode.OK).json(user);
    } catch (err: any) {
        next(err);
    }
};

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

export const updateMeHandler = async (
    req: Request<{}, {}, UpdateUserInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId: string = res.locals.user._id.toString();

        const user = await updateUser(userId, req.body);
        updateUserCache(userId, user);

        res.status(StatusCode.OK).json(user);
    } catch (err: any) {
        if (err.code === MongoErrorCodes.DUPLICATE_KEY) {
            err = new ConflictError('Username already exists');
        }
        next(err);
    }
};

export const updateMyLocationHandler = async (
    req: Request<{}, {}, UpdateUserLocationInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId: string = res.locals.user._id.toString();

        const user = await updateUser(userId, { location: req.body });
        updateUserCache(userId, user);

        res.status(StatusCode.NO_CONTENT).json();
    } catch (err: any) {
        next(err);
    }
};

export const updateMyInventoryHandler = async (
    req: Request<{}, {}, UpdateUserInventoryInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const itemId: string = req.body.item;
        const rescuerId: string = res.locals.user._id.toHexString();
        const inventory = (await getUser(rescuerId)).inventory ?? new Map<string, number>();
        const currentQuantity = inventory.get(itemId) ?? 0;
        const requestedQuantity = req.body.quantity;

        if (currentQuantity === requestedQuantity) {
            res.status(StatusCode.NO_CONTENT).json();
            return;
        }

        if (currentQuantity > requestedQuantity) {
            await updateItemQuantity(itemId, currentQuantity - requestedQuantity);
        } else if (currentQuantity < requestedQuantity) {
            await ensureNeededItemQuantityExists(itemId, requestedQuantity - currentQuantity);
            await updateItemQuantity(itemId, currentQuantity - requestedQuantity);
        }

        if (requestedQuantity === 0) {
            inventory.delete(itemId);
        } else {
            inventory.set(itemId, requestedQuantity);
        }

        const user = await updateUser(rescuerId, { inventory });
        res.status(StatusCode.OK).json(user);
    } catch (err: any) {
        next(err);
    }
};

export const deleteUserHandler = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        await deleteUser(req.params.id);
        deleteUserCache(req.params.id);

        res.status(StatusCode.NO_CONTENT).json();
    } catch (err: any) {
        next(err);
    }
};

export const deleteMeHandler = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = res.locals.user._id.toString();

        res.clearCookie('accessToken');
        res.clearCookie('loggedIn');

        await deleteUser(userId);
        deleteUserCache(userId);

        res.status(StatusCode.NO_CONTENT).json();
    } catch (err: any) {
        next(err);
    }
};

async function ensureNeededItemQuantityExists(itemId: string, neededQuantity: number) {
    const item = await getItem(itemId);

    if ((item.quantity ?? 0) < neededQuantity) {
        throw new ConflictError(`Needed item quantity is not available`);
    }
}
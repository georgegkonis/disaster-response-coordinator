import { NextFunction, Request, Response } from 'express';
import {
    createItemRequest,
    deleteItemRequest,
    findItemRequests,
    getItemRequest,
    updateItemRequest
} from '../services/item-request.service';
import { CreateItemRequestInput, UpdateItemRequestStatusInput } from '../schemas/item-request.schema';
import { StatusCode } from '../enums/status-code.enum';
import { TaskStatus } from '../enums/task-status.enum';
import { getItem } from '../services/item.service';
import UnauthorizedError from '../errors/unauthorized-error';
import ForbiddenError from '../errors/forbidden-error';
import { ItemRequest } from '../models/item-request.model';
import { User } from '../models/user.model';
import { updateUser } from '../services/user.service';
import { withinDistance } from '../utils/distance';

export const createItemRequestHandler = async (
    req: Request<{}, {}, CreateItemRequestInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        req.body.citizen = res.locals.user._id!;

        await getItem(req.body.item);

        const request = await createItemRequest(req.body);

        res.status(StatusCode.CREATED).json(request);
    } catch (error) {
        next(error);
    }
};

export const findMyItemRequestsHandler = async (
    req: Request<{}, {}, {}, { status?: TaskStatus, item?: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const citizen: string = res.locals.user._id;

        const requests = await findItemRequests({ ...req.query, citizen });

        res.status(StatusCode.OK).json(requests);
    } catch (error) {
        next(error);
    }
};

export const findItemRequestsHandler = async (
    req: Request<{}, {}, {}, { status?: TaskStatus, item?: string, citizen?: string, }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const requests = await findItemRequests(req.query);

        res.status(StatusCode.OK).json(requests);
    } catch (error) {
        next(error);
    }
};

export const updateItemRequestStatusHandler = async (
    req: Request<{ id: string }, {}, UpdateItemRequestStatusInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const rescuer = res.locals.user;

        await canUpdateStatus(req.params.id, rescuer._id!.toHexString(), req.body.status);

        const input: Partial<ItemRequest> = { ...req.body, rescuer: rescuer._id };

        if (req.body.status === TaskStatus.ACCEPTED) {
            input.acceptedAt = new Date();
        } else if (req.body.status === TaskStatus.COMPLETED) {
            input.completedAt = new Date();
        }

        const request = await updateItemRequest(req.params.id, input);

        if (request.status === TaskStatus.COMPLETED) {
            await updateRescuerInventory(request);
        }

        res.status(StatusCode.OK).json(request);
    } catch (error) {
        next(error);
    }
};

export const deleteItemRequestHandler = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        await canDelete(req.params.id, res.locals.user._id.toHexString());

        await deleteItemRequest(req.params.id);

        res.status(StatusCode.NO_CONTENT).end();
    } catch (error) {
        next(error);
    }
};

async function canUpdateStatus(id: string, rescuerId: string, status: TaskStatus) {
    const request = await getItemRequest(id);

    // Accepting a request
    if (status === TaskStatus.ACCEPTED) {
        if (request.status !== TaskStatus.PENDING) {
            throw new ForbiddenError('You can only accept a request that is pending');
        }
    }

    // Completing a request
    if (status === TaskStatus.COMPLETED) {
        if (request.status !== TaskStatus.ACCEPTED || request.rescuer!._id.toHexString() !== rescuerId) {
            throw new ForbiddenError('You can only complete a request that is accepted by you');
        }

        const rescuer = request.rescuer as User;
        const citizen = request.citizen as User;

        if (!withinDistance(rescuer.location, citizen.location)) {
            throw new ForbiddenError('You are not close enough to complete this request');
        }

        const quantity = rescuer.inventory?.get(request.item._id.toHexString()) ?? 0;

        if (quantity < request.peopleCount) {
            throw new ForbiddenError('You do not have the required items to complete this request')
        }
    }

    // Cancelling a request
    if (status === TaskStatus.PENDING) {
        if (request.status !== TaskStatus.ACCEPTED || request.rescuer!._id.toHexString() !== rescuerId) {
            throw new ForbiddenError('You can only cancel a request that is accepted by you');
        }
    }
}

async function canDelete(id: string, userId: string) {
    const request = await getItemRequest(id);

    if (request.citizen._id.toHexString() !== userId) {
        throw new UnauthorizedError('You are not authorized to delete this item request');
    }

    if (request.status !== TaskStatus.PENDING) {
        throw new ForbiddenError('You cannot delete an item request that is not pending');
    }
}

async function updateRescuerInventory(request: ItemRequest) {
    const itemId = request.item._id.toHexString();
    const rescuerId = request.rescuer!._id.toHexString();
    const inventory = (request.rescuer as User).inventory ?? new Map<string, number>();
    const quantity = inventory.get(itemId) ?? 0;

    if (quantity > request.peopleCount) {
        inventory.set(itemId, quantity - request.peopleCount);
    } else {
        inventory.delete(itemId);
    }

    await updateUser(rescuerId, { inventory });
}



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
        req.body.rescuer = res.locals.user._id;

        if (req.body.status === TaskStatus.ACCEPTED) {
            req.body.acceptedAt = new Date();
        }

        const request = await updateItemRequest(req.params.id, req.body);

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
        await canBeDeleted(req.params.id, res.locals.user._id.toHexString());

        await deleteItemRequest(req.params.id);

        res.status(StatusCode.NO_CONTENT).end();
    } catch (error) {
        next(error);
    }
};

async function canBeDeleted(id: string, userId: string) {
    const request = await getItemRequest(id);

    if (request.citizen._id.toHexString() !== userId) {
        throw new UnauthorizedError('You are not authorized to delete this item request');
    }

    if (request.status !== TaskStatus.PENDING) {
        throw new ForbiddenError('You cannot delete an item request that is not pending');
    }
}

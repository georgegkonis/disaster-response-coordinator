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
import { QueryOptions } from 'mongoose';
import AppError from '../errors/app-error';

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

export const getMyItemRequestsHandler = async (
    req: Request<{}, {}, {}, { status?: TaskStatus, item?: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const options: QueryOptions = { populate: ['item', 'rescuer'] };
        const citizen: string = res.locals.user._id;

        const requests = await findItemRequests({ ...req.query, citizen }, options);

        res.status(StatusCode.OK).json(requests);
    } catch (error) {
        next(error);
    }
};

export const getItemRequestsHandler = async (
    req: Request<{}, {}, {}, { status?: TaskStatus, item?: string, citizen?: string, }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const options: QueryOptions = { populate: ['item', 'rescuer', 'citizen'] };

        const requests = await findItemRequests(req.query, options);

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
        const request = await getItemRequest(req.params.id);

        if (request.citizen._id.toHexString() !== res.locals.user._id.toHexString()) {
            next(new AppError('You are not authorized to delete this item request', StatusCode.UNAUTHORIZED))
            return;
        }

        if (request.status === TaskStatus.COMPLETED) {
            next(new AppError('You cannot delete a completed item request', StatusCode.FORBIDDEN));
            return;
        }

        await deleteItemRequest(req.params.id);

        res.status(StatusCode.NO_CONTENT).end();
    } catch (error) {
        next(error);
    }
};
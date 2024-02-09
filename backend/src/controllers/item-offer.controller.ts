import { NextFunction, Request, Response } from 'express';
import { CreateItemOfferInput, UpdateItemOfferStatusInput } from '../schemas/item-offer.schema';
import { createItemOffer, deleteItemOffer, findItemOffers, getItemOffer, updateItemOffer } from '../services/item-offer.service';
import { StatusCode } from '../enums/status-code.enum';
import { TaskStatus } from '../enums/task-status.enum';
import { getItem } from '../services/item.service';
import { QueryOptions } from 'mongoose';
import AppError from '../errors/app-error';

export const createItemOfferHandler = async (
    req: Request<{}, {}, CreateItemOfferInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        req.body.citizen = res.locals.user._id;

        await getItem(req.body.item);

        const offer = await createItemOffer(req.body);

        res.status(StatusCode.CREATED).json(offer);
    } catch (error) {
        next(error);
    }
};

export const getMyItemOffersHandler = async (
    req: Request<{}, {}, {}, { status?: TaskStatus, item: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const citizen = res.locals.user._id;
        const options: QueryOptions = { populate: ['item', 'rescuer'] };

        const offers = await findItemOffers({ ...req.query, citizen }, options);

        res.status(StatusCode.OK).json(offers);
    } catch (error) {
        next(error);
    }
};

export const getItemOffersHandler = async (
    req: Request<{}, {}, {}, { status?: TaskStatus, item?: string, citizen?: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const options: QueryOptions = { populate: ['item', 'rescuer', 'citizen'] };

        const offers = await findItemOffers(req.query, options);

        res.status(StatusCode.OK).json(offers);
    } catch (error) {
        next(error);
    }
};

export const updateItemOfferStatusHandler = async (
    req: Request<{ id: string }, {}, UpdateItemOfferStatusInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        req.body.rescuer = res.locals.user._id;

        if (req.body.status === TaskStatus.ACCEPTED) {
            req.body.acceptedAt = new Date();
        }

        const offer = await updateItemOffer(req.params.id, req.body);

        res.status(StatusCode.OK).json(offer);
    } catch (error) {
        next(error);
    }
};

export const deleteItemOfferHandler = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const offer = await getItemOffer(req.params.id);

        if (offer.citizen._id.toHexString() !== res.locals.user._id.toHexString()) {
            next(new AppError('You are not authorized to delete this item offer', StatusCode.UNAUTHORIZED));
            return;
        }

        if (offer.status === TaskStatus.COMPLETED) {
            next(new AppError('You cannot delete a completed item offer', StatusCode.FORBIDDEN));
            return;
        }

        await deleteItemOffer(req.params.id);

        res.status(StatusCode.NO_CONTENT).end();
    } catch (error) {
        next(error);
    }
};

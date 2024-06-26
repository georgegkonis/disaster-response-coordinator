import { NextFunction, Request, Response } from 'express';
import { CreateItemOfferInput, UpdateItemOfferStatusInput } from '../schemas/item-offer.schema';
import { createItemOffer, deleteItemOffer, findItemOffers, getItemOffer, updateItemOffer } from '../services/item-offer.service';
import { StatusCode } from '../enums/status-code.enum';
import { TaskStatus } from '../enums/task-status.enum';
import { getItem } from '../services/item.service';
import { QueryOptions } from 'mongoose';
import UnauthorizedError from '../errors/unauthorized-error';
import ForbiddenError from '../errors/forbidden-error';

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

export const findMyItemOffersHandler = async (
    req: Request<{}, {}, {}, { status?: TaskStatus, item: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const citizen = res.locals.user._id;
        const offers = await findItemOffers({ ...req.query, citizen });

        res.status(StatusCode.OK).json(offers);
    } catch (error) {
        next(error);
    }
};

export const findItemOffersHandler = async (
    req: Request<{}, {}, {}, { status?: TaskStatus, item?: string, citizen?: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const offers = await findItemOffers(req.query);

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
        await canBeDeleted(req.params.id, res.locals.user._id.toHexString());

        await deleteItemOffer(req.params.id);

        res.status(StatusCode.NO_CONTENT).end();
    } catch (error) {
        next(error);
    }
};

async function canBeDeleted(id: string, userId: string) {
    const offer = await getItemOffer(id);

    if (offer.citizen._id.toHexString() !== userId) {
        throw new UnauthorizedError('You are not authorized to delete this item offer');
    }

    if (offer.status === TaskStatus.COMPLETED) {
        throw new ForbiddenError('You cannot delete a completed item offer');
    }
}

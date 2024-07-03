import { NextFunction, Request, Response } from 'express';
import { CreateItemOfferInput, UpdateItemOfferStatusInput } from '../schemas/item-offer.schema';
import { createItemOffer, deleteItemOffer, findItemOffers, getItemOffer, updateItemOffer } from '../services/item-offer.service';
import { StatusCode } from '../enums/status-code.enum';
import { TaskStatus } from '../enums/task-status.enum';
import { getItem } from '../services/item.service';
import UnauthorizedError from '../errors/unauthorized-error';
import ForbiddenError from '../errors/forbidden-error';
import { User } from '../models/user.model';
import { ItemOffer } from '../models/item-offer.model';
import { updateUser } from '../services/user.service';
import { withinDistance } from '../utils/distance';

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
        const rescuer = res.locals.user;

        await canUpdateStatus(req.params.id, rescuer._id!.toHexString(), req.body.status);

        const input: Partial<ItemOffer> = { ...req.body, rescuer: rescuer._id };

        if (req.body.status === TaskStatus.ACCEPTED) {
            input.acceptedAt = new Date();
        } else if (req.body.status === TaskStatus.COMPLETED) {
            input.completedAt = new Date();
        }

        const offer = await updateItemOffer(req.params.id, input);

        if (offer.status === TaskStatus.COMPLETED) {
            await updateRescuerInventory(offer);
        }

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
        await canDelete(req.params.id, res.locals.user._id.toHexString());

        await deleteItemOffer(req.params.id);

        res.status(StatusCode.NO_CONTENT).end();
    } catch (error) {
        next(error);
    }
};

async function canUpdateStatus(offerId: string, rescuerId: string, status: TaskStatus) {
    const offer = await getItemOffer(offerId);

    // Accepting an offer
    if (status === TaskStatus.ACCEPTED) {
        if (offer.status !== TaskStatus.PENDING) {
            throw new ForbiddenError('You can only accept an offer that is pending');
        }
    }

    // Completing an offer
    if (status === TaskStatus.COMPLETED) {
        if (offer.status !== TaskStatus.ACCEPTED || offer.rescuer!._id.toHexString() !== rescuerId) {
            throw new ForbiddenError('You can only complete an offer that is accepted by you');
        }

        const rescuer = offer.rescuer as User;
        const citizen = offer.citizen as User;

        if (!withinDistance(rescuer.location, citizen.location)) {
            throw new ForbiddenError('You are not close enough to complete this offer');
        }
    }

    // Canceling an offer
    if (status === TaskStatus.PENDING) {
        if (offer.status !== TaskStatus.ACCEPTED || offer.rescuer!._id.toHexString() !== rescuerId) {
            throw new ForbiddenError('You can only cancel an offer that is accepted by you');
        }
    }
}

async function canDelete(id: string, userId: string) {
    const offer = await getItemOffer(id);

    if (offer.citizen._id.toHexString() !== userId) {
        throw new UnauthorizedError('You are not authorized to delete this item offer');
    }

    if (offer.status !== TaskStatus.PENDING) {
        throw new ForbiddenError('You cannot delete an item offer that can been accepted or completed');
    }
}

async function updateRescuerInventory(offer: ItemOffer) {
    const itemId = offer.item._id.toHexString();
    const rescuerId = offer.rescuer!._id.toHexString();
    const inventory = (offer.rescuer as User).inventory ?? new Map<string, number>();
    const quantity = inventory.get(itemId) ?? 0;

    inventory.set(itemId, quantity + offer.quantity);

    await updateUser(rescuerId, { inventory });
}

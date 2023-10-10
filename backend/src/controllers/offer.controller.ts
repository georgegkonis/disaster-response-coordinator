import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums/status-code.enum';
import { createOffer, deleteOffer, getOffer, getOffers, rateOffer } from '../services/offer.service';

export const getOffersHandler = async (
    req: Request<{}, {}, {}, { categoryId?: string, storeId?: number, creatorId?: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { categoryId, storeId, creatorId } = req.query;

        const offers = await getOffers(categoryId, storeId, creatorId);
        res.status(StatusCode.OK).json(offers);
    } catch (err: any) {
        next(err);
    }
};

export const createOfferHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const offer = await createOffer(req.body);

        const productId = offer.productId;

        // TODO: update the prices of the product

        res.status(StatusCode.CREATED).json(offer);
    } catch (err: any) {
        next(err);
    }
};

export const getOfferHandler = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const offer = await getOffer(req.params.id);
        res.status(StatusCode.OK).json(offer);
    } catch (err: any) {
        next(err);
    }
};

export const deleteOfferHandler = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        await deleteOffer(req.params.id);
        res.status(StatusCode.NO_CONTENT).json();
    } catch (err: any) {
        next(err);
    }
};

export const rateOfferHandler = async (
    req: Request<{ id: string }, {}, { positive: boolean }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const offer = await rateOffer(req.params.id, req.body.positive);

        const creatorId = offer.creatorId;

        // TODO: update the score of the creator

        res.status(StatusCode.NO_CONTENT).json();
    } catch (err: any) {
        next(err);
    }
};

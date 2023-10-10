import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums/status-code.enum';
import AppError from '../errors/app-error';
import { deleteAllStores, insertAndUpdateStores, getStores } from '../services/store.service';
import { Offer } from '../models/offer.model';
import { getOffers } from '../services/offer.service';
import { Store } from '../models/store.model';

export const getStoresHandler = async (
    req: Request<{}, {}, {}, { name?: string, categoryId?: string}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, categoryId } = req.query;

        let stores = await getStores(name);

        if (categoryId) {
            const offers = await getOffers(categoryId);

            const storeIds: number[] = offers
                .filter((offer: Offer) => offer.likes > 0 || offer.dislikes > 0)
                .map((offer: any) => offer.storeId);

            stores = stores.filter((store: Store) => storeIds.includes(store.id));
        }
        res.status(StatusCode.OK).json(stores);
    } catch (err: any) {
        next(err);
    }
};

export const uploadStoresHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.body.jsonData) {
            return next(new AppError('No JSON data found', StatusCode.BAD_REQUEST));
        }

        await insertAndUpdateStores(req.body.jsonData);

        res.status(StatusCode.OK).json({ message: 'Data loaded successfully' });
    } catch (err: any) {
        next(err);
    }
};

export const deleteAllStoresHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await deleteAllStores();

        res.status(StatusCode.OK).json({ message: 'All stores deleted successfully' });
    } catch (err: any) {
        next(err);
    }
};
import offerModel from '../models/offer.model';
import AppError from '../errors/app-error';
import { StatusCode } from '../enums/status-code.enum';

export const getOffers = async (categoryId?: string, storeId?: number, creatorId?: string) => {
    let query = {};

    if (categoryId) query = { ...query, categoryId };
    if (storeId) query = { ...query, storeId };
    if (creatorId) query = { ...query, creatorId };

    return offerModel.find(query);
};

export const getOffer = async (id: string) => {
    return offerModel.findById(id);
};

export const createOffer = async (offer: any) => { // TODO: add Offer type
    return offerModel.create(offer);
};

export const deleteOffer = async (id: string) => {
    return offerModel.findByIdAndDelete(id);
};

export const rateOffer = async (id: string, positive: boolean) => {
    const offer = await getOffer(id);

    if (!offer) throw new AppError('Offer not found', StatusCode.NOT_FOUND);

    if (positive) offer.likes++;
    else offer.dislikes++;

    offer.save();

    return offer;
};
import itemOfferModel, { ItemOffer } from '../models/item-offer.model';
import { FilterQuery, QueryOptions } from 'mongoose';
import NotFoundError from '../errors/not-found-error';

export const createItemOffer = async (
    input: ItemOffer
) => {
    const itemOffer: ItemOffer = await itemOfferModel.create(input);

    return itemOffer;
};

export const getItemOffer = async (
    id: string
) => {
    const itemOffer: ItemOffer | null = await itemOfferModel.findById(id).lean();

    if (!itemOffer) throw new NotFoundError('item offer', id);

    return itemOffer;
}

export const findItemOffers = async (
    filter: FilterQuery<ItemOffer> = {},
    options: QueryOptions = {}
) => {
    const itemOffers: ItemOffer[] = await itemOfferModel.find<ItemOffer>(filter, {}, options);

    return itemOffers;
};

export const updateItemOffer = async (
    id: string,
    input: Partial<ItemOffer>
) => {
    const itemOffer: ItemOffer | null = await itemOfferModel.findByIdAndUpdate<ItemOffer>(id, input, { new: true });

    if (!itemOffer) throw new NotFoundError('item offer', id);

    return itemOffer;
};

export const deleteItemOffer = async (
    id: string
) => {
    await itemOfferModel.findByIdAndDelete(id);
}
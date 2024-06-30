import itemOfferModel, { ItemOffer } from '../models/item-offer.model';
import { FilterQuery, QueryOptions } from 'mongoose';
import NotFoundError from '../errors/not-found-error';

const populate: string[] = ['item', 'rescuer', 'citizen'];

export const createItemOffer = async (
    input: ItemOffer
) => {
    let itemOffer: ItemOffer = await itemOfferModel.create<ItemOffer>(input);

    itemOffer = await getItemOffer(itemOffer._id!.toHexString());

    return itemOffer;
};

export const getItemOffer = async (
    id: string
) => {
    const options: QueryOptions = { populate };
    const itemOffer: ItemOffer | null = await itemOfferModel.findById<ItemOffer>(id, {}, options);

    if (!itemOffer) throw new NotFoundError('item offer', id);

    return itemOffer;
};

export const findItemOffers = async (
    filter: FilterQuery<ItemOffer> = {}
) => {
    const options: QueryOptions = { populate };
    const itemOffers: ItemOffer[] = await itemOfferModel.find<ItemOffer>(filter, {}, options);

    return itemOffers;
};

export const updateItemOffer = async (
    id: string,
    input: Partial<ItemOffer>
) => {
    const options: QueryOptions = { new: true, populate };
    const itemOffer: ItemOffer | null = await itemOfferModel.findByIdAndUpdate<ItemOffer>(id, input, options);

    if (!itemOffer) throw new NotFoundError('item offer', id);

    return itemOffer;
};

export const deleteItemOffer = async (
    id: string
) => {
    await itemOfferModel.findByIdAndDelete<ItemOffer>(id);
};
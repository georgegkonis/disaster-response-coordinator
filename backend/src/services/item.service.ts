import itemModel, { Item } from '../models/item.model';
import { FilterQuery, QueryOptions } from 'mongoose';
import NotFoundError from '../errors/not-found-error';

export const createItem = async (
    input: Item
) => {
    const item: Item = await itemModel.create<Item>(input);

    return item;
};

export const getItem = async (
    id: string
) => {
    const item: Item | null = await itemModel.findById(id).lean();

    if (!item) throw new NotFoundError('item', id);

    return item;
};

export const insertAndUpdateItems = async (
    items: Item[]
) => {
    const updateOps = items.map((item) => ({
        updateOne: {
            filter: { code: item.code },
            update: { $set: item },
            upsert: true
        }
    }));

    await itemModel.bulkWrite(updateOps);
};

export const findItems = async (
    query: FilterQuery<Item> = {},
    options: QueryOptions = {}
) => {
    const items: Item[] = await itemModel.find<Item>(query, {}, options).lean();

    return items;
};

export const deleteAllItems = async () => {
    await itemModel.deleteMany();
};

export const updateItemQuantity = async (
    id: string,
    quantity: number
) => {
    const item: Item | null = await itemModel.findByIdAndUpdate<Item>(id, { $set: { quantity } }, { new: true });

    if (!item) throw new NotFoundError('item', id);

    return item;
};

export const getIncrementedItemCode = async () => {
    const item = await itemModel.findOne().sort('-code').select('code').exec();
    const maxCode = item ? item.code : 0;

    return maxCode + 1;
};
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
    const item: Item | null = await itemModel.findById(id);

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
    const items: Item[] = await itemModel.find<Item>(query, {}, options);

    return items;
};

export const updateItem = async (
    id: string,
    input: Partial<Item>
) => {
    const item: Item | null = await itemModel.findByIdAndUpdate<Item>(id, { $set: input }, { new: true });

    if (!item) throw new NotFoundError('item', id);

    return item;
};

export const updateItemQuantity = async (
    id: string,
    quantity: number
) => {
    const item: Item | null = await itemModel.findByIdAndUpdate<Item>(id, { $inc: { quantity } }, { new: true });

    if (!item) throw new NotFoundError('item', id);

    return item;
};

export const deleteItem = async (
    id: string
) => {
    await itemModel.findByIdAndDelete<Item>(id);
};

export const deleteItems = async (
    query: FilterQuery<Item> = {}
) => {
    await itemModel.deleteMany(query);
};

export const getIncrementedItemCode = async () => {
    const item = await itemModel.findOne().sort('-code').select('code').exec();
    const maxCode = item ? item.code : 0;

    return maxCode + 1;
};
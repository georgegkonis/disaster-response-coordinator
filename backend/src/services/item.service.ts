import itemModel, { Item } from '../models/item.model';
import { FilterQuery, QueryOptions } from 'mongoose';
import ItemNotFoundError from '../errors/item-not-found-error';

export const createItem = async (
    input: Partial<Item>
) => {
    const item: Item = await itemModel.create(input);

    return item;
};

export const getItem = async (
    id: string
) => {
    const item: Item | null = await itemModel.findById(id).lean();

    if (!item) throw new ItemNotFoundError(id);

    return item;
};

export const insertAndUpdateItems = async (jsonData: any[]) => {
    const bulkOps = jsonData.map((item: Item) => ({
        updateOne: {
            filter: { id: item.id },
            update: { $set: item },
            upsert: true
        }
    }));

    await itemModel.bulkWrite(bulkOps);
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
    const item: Item | null = await itemModel.findOneAndUpdate<Item>(
        { id },
        { $set: { quantity } },
        { new: true }
    );

    if (!item) throw new ItemNotFoundError(id);

    return item;
};
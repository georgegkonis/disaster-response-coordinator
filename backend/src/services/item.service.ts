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
    const item: Item | null = await itemModel.findByIdAndUpdate<Item>(id, { $set: { quantity } }, { new: true });

    if (!item) throw new NotFoundError('item', id);

    return item;
};

export const getIncrementedItemId = async () => {
    const item = await itemModel.findOne().sort('-id').select('id').exec();
    const maxId = item ? item.id : 0;

    return maxId + 1;
}
import itemModel, { Item } from '../models/item.model';
import { FilterQuery, QueryOptions } from 'mongoose';

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
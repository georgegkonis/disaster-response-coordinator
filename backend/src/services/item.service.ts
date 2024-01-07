import itemModel, { Item } from '../models/item.model';

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

export const deleteAllItems = async () => {
    await itemModel.deleteMany();
};
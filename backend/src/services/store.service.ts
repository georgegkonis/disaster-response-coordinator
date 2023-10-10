import storeModel from '../models/store.model';

export const getStores = async (name?: string) => {
    let query = {};

    if (name) {
        query = { ...query, "tags.name": { $regex: name, $options: 'i' } };
    }

    return storeModel.find(query).lean();
};

export const insertAndUpdateStores = async (jsonData: any[]) => {
    const bulkOps = jsonData.map((item: any) => ({
        updateOne: {
            filter: { id: item.id },
            update: { $set: item },
            upsert: true
        }
    }));

    await storeModel.bulkWrite(bulkOps);
};

export const deleteAllStores = async () => {
    await storeModel.deleteMany();
};
import storeModel from '../models/store.model';

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
}
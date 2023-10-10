import categoryModel from '../models/category.model';

export const insertAndUpdateCategories = async (jsonData: any[]) => {
    const bulkOps = jsonData.map((item: any) => ({
        updateOne: {
            filter: { id: item.id },
            update: { $set: item },
            upsert: true
        }
    }));

    await categoryModel.bulkWrite(bulkOps);
};

export const deleteAllCategories = async () => {
    await categoryModel.deleteMany();
}
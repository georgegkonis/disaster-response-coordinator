import categoryModel, { Category } from '../models/category.model';

export const insertAndUpdateCategories = async (categories: any[]) => {
    const bulkOps = categories.map((category: any) => ({
        updateOne: {
            filter: { id: category.id },
            update: { $set: { id: category.id, name: category.category_name } },
            upsert: true
        }
    }));

    await categoryModel.bulkWrite(bulkOps);
};

export const deleteAllCategories = async () => {
    await categoryModel.deleteMany();
}
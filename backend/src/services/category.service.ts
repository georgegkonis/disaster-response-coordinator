import categoryModel, { Category } from '../models/category.model';
import { FilterQuery, QueryOptions } from 'mongoose';

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

export const findCategories = async (
    query: FilterQuery<Category> = {},
    options: QueryOptions = {}
) => {
    const categories: Category[] = await categoryModel.find<Category>(query, {}, options).lean();

    return categories;
};

export const deleteAllCategories = async () => {
    await categoryModel.deleteMany();
};
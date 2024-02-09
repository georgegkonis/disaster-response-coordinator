import categoryModel, { Category } from '../models/category.model';
import { FilterQuery, QueryOptions } from 'mongoose';
import NotFoundError from '../errors/not-found-error';

export const createCategory = async (
    input: Partial<Category>
) => {
    const category: Category = await categoryModel.create(input);

    return category;
};

export const getCategory = async (
    id: string
) => {
    const category: Category | null = await categoryModel.findById(id).lean();

    if (!category) throw new NotFoundError('category', id);

    return category;
};

export const insertAndUpdateCategories = async (
    categories: any[]
) => {
    const bulkOps = categories.map((category: any) => ({
        updateOne: {
            filter: { id: category.id },
            update: { $set: { ...category, name: category.category_name } },
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
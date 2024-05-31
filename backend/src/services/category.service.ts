import categoryModel, { Category } from '../models/category.model';
import { FilterQuery, QueryOptions } from 'mongoose';
import NotFoundError from '../errors/not-found-error';

export const createCategory = async (
    input: Category
) => {
    const category: Category = await categoryModel.create<Category>(input);

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
    categories: Category[]
) => {
    const updateOps = categories.map((category) => ({
        updateOne: {
            filter: { code: category.code },
            update: { $set: category },
            upsert: true
        }
    }));

    await categoryModel.bulkWrite(updateOps);
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

export const getIncrementedCategoryId = async () => {
    const category = await categoryModel.findOne().sort('-id').select('id').exec();
    const maxId = category ? category.code : 0;

    return maxId + 1;
};
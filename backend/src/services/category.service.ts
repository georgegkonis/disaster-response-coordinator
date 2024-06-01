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

export const updateCategory = async (
    id: string,
    input: Partial<Category>
) => {
    const category: Category | null = await categoryModel.findByIdAndUpdate<Category>(id, input, { new: true });

    if (!category) throw new NotFoundError('category', id);

    return category;
};

export const deleteCategory = async (
    id: string
) => {
    await categoryModel.findByIdAndDelete<Category>(id);
};

export const deleteCategories = async (
    query: FilterQuery<Category> = {}
) => {
    await categoryModel.deleteMany(query);
};

export const getIncrementedCategoryCode = async () => {
    const category = await categoryModel.findOne().sort('-code').select('code').exec();
    const maxCode = category ? category.code : 0;

    return maxCode + 1;
};
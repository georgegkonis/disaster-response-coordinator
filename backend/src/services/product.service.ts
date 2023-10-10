import productModel from '../models/product.model';

export const insertAndUpdateProducts = async (jsonData: any[]) => {
    const bulkOps = jsonData.map((item: any) => ({
        updateOne: {
            filter: { id: item.id },
            update: { $set: item },
            upsert: true
        }
    }));

    await productModel.bulkWrite(bulkOps);
};

export const deleteAllProducts = async () => {
    await productModel.deleteMany();
}
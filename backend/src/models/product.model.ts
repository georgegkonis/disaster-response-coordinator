import { getModelForClass, index, prop } from '@typegoose/typegoose';

@index({ id: 'asc', name: 'text', category: 'asc', subcategory: 'asc' })
export class Product {

    @prop({ required: true, unique: true })
    id: string;

    @prop({ required: true })
    name: string;

    @prop({ required: true })
    category: string;

    @prop({ required: true })
    subcategory: string;

    @prop({ allowMixed: 0 })
    prices: ProductPrice[];
}

export class ProductPrice {
    @prop({ required: true })
    date: Date;

    @prop({ required: true })
    price: number;
}

const productModel = getModelForClass(Product);

export default productModel;

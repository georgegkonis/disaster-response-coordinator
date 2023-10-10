import { getModelForClass, index, prop, Ref } from '@typegoose/typegoose';
import { Category, Subcategory } from './category.model';

@index({ id: 'asc', name: 'text', category: 'asc', subcategory: 'asc' })
export class Product {

    @prop({ required: true, unique: true })
    id: string;

    @prop({ required: true })
    name: string;

    @prop({ required: true })
    category: Ref<Category>;

    @prop({ required: true })
    subcategory: string;

    @prop()
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

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
}

const productModel = getModelForClass(Product);

export default productModel;

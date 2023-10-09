import { getModelForClass, index, prop, Ref } from '@typegoose/typegoose';
import { Category, Subcategory } from './category.model';

@index({ id: 'hashed', name: 'text', category: 'asc', subcategory: 'asc' })
export class Product {
    @prop({ unique: true, required: true })
    id: string;

    @prop({ required: true })
    name: string;

    @prop({ ref: 'Category', required: true })
    category: Ref<Category>;

    @prop({ ref: 'Subcategory', required: true })
    subcategory: Ref<Subcategory>;
}

const productModel = getModelForClass(Product);

export default productModel;

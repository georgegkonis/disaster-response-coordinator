import { getModelForClass, index, prop } from '@typegoose/typegoose';

export class Subcategory {
    @prop({ required: true })
    uuid: string;

    @prop({ required: true })
    name: string;
}

export class Category {
    @prop({ unique: true, required: true })
    id: string;

    @prop({ required: true })
    name: string;

    @prop({ type: () => [Subcategory], required: true })
    subcategories: Subcategory[];
}

const categoryModel = getModelForClass(Category);

export default categoryModel;

import { getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';

@index({ id: 'asc', name: 'text' })
@modelOptions({
    schemaOptions: {
        _id: false
    }
})
export class Category {
    @prop({ unique: true, required: true })
    id: string;

    @prop({ required: true, alias: 'category_name' })
    name: string;
}

const categoryModel = getModelForClass(Category);

export default categoryModel;

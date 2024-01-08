import { getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';

@index({ id: 'asc', name: 'text' })
@modelOptions({
    schemaOptions: {
        _id: false
    }
})
export class Category {
    @prop({ unique: true, required: true })
    public id!: number;

    @prop({ required: true, alias: 'category_name' })
    public name!: string;
}

const categoryModel = getModelForClass(Category);

export default categoryModel;

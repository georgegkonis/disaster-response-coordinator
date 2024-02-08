import { getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@index({ id: 'asc', name: 'text' })
@modelOptions({
    schemaOptions: {
        collection: 'categories',
        timestamps: true
    }
})
export class Category {
    @prop({ auto: true })
    public _id?: Types.ObjectId;

    @prop({ unique: true, required: true })
    public id!: number;

    @prop({ required: true, alias: 'category_name' })
    public name!: string;
}

const categoryModel = getModelForClass(Category);

export default categoryModel;

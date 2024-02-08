import { getModelForClass, index, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Category } from './category.model';

class ItemDetail {
    @prop({ required: true, alias: 'detail_name' })
    public name!: string;

    @prop({ required: true, alias: 'detail_value' })
    public value!: string;
}

@index({ id: 'asc', name: 'text', category: 'asc' })
@modelOptions({
    schemaOptions: {
        collection: 'items',
        timestamps: true
    }
})
export class Item {
    @prop({ auto: true })
    public _id?: Types.ObjectId;

    @prop({ unique: true, required: true })
    public id!: number;

    @prop({ required: true })
    public name!: string;

    @prop({ required: true, ref: () => Category })
    public category!: Ref<Category>;

    @prop({ required: true, type: () => [ItemDetail], _id: false })
    public details!: ItemDetail[];

    @prop({ default: 0 })
    public quantity?: number;
}

const itemModel = getModelForClass(Item);

export default itemModel;
import { getModelForClass, index, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Category } from './category.model';

class ItemDetail {
    @prop({ required: true, alias: 'detail_name' })
    public name!: string;

    @prop({ required: true, alias: 'detail_value' })
    public value!: string;
}

@index({ code: 'asc', name: 'text', category: 'asc' })
@modelOptions({
    schemaOptions: {
        collection: 'items',
        timestamps: true,
        toJSON: { virtuals: true, versionKey: false },
        toObject: { virtuals: true, versionKey: false }
    }
})
export class Item {
    @prop({ auto: true })
    public _id?: Types.ObjectId;

    @prop({ unique: true, required: true })
    public code!: number;

    @prop({ required: true })
    public name!: string;

    @prop({ required: true, ref: () => Category })
    public category!: Ref<Category>;

    @prop({ required: true, type: () => [ItemDetail], _id: false })
    public details!: ItemDetail[];

    @prop({ default: 0 })
    public quantity?: number;

    //#region Virtuals

    public id?: Types.ObjectId;

    public createdAt?: Date;

    public updatedAt?: Date;

    //#endregion
}

const itemModel = getModelForClass(Item);

export default itemModel;
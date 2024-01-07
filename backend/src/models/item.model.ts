import { getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';

class ItemDetail {
    @prop({ required: true, alias: 'detail_name' })
     name!: string;

    @prop({ required: true, alias: 'detail_value' })
    value!: string;
}

@index({ id: 'asc', name: 'text', category: 'asc' })
@modelOptions({
    schemaOptions: {
        collection: 'items',
        _id: false
    }
})
export class Item {
    @prop({ unique: true, required: true })
    id!: number;

    @prop({ required: true })
    name!: string;

    @prop({ required: true })
    category!: string;

    @prop({ required: true, type: () => [ItemDetail], _id: false })
    details!: ItemDetail[];

    @prop({ default: 0 })
    quantity?: number;
}

const itemModel = getModelForClass(Item);

export default itemModel;
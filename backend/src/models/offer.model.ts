import { getModelForClass, index, prop } from '@typegoose/typegoose';

@index({ creatorId: 'hashed', productId: 'hashed', categoryId: 'hashed', storeId: 'hashed' })
export class Offer {

    @prop({ required: true })
    creatorId: string;

    @prop({ required: true })
    productId: string;

    @prop({ required: true })
    categoryId: string;

    @prop({ required: true })
    storeId: string;

    @prop({ required: true })
    price: number;

    @prop({ required: true, default: 0 })
    likes: number;

    @prop({ required: true, default: 0 })
    dislikes: number;
}

const offerModel = getModelForClass(Offer);

export default offerModel;
import { getModelForClass, index, prop } from '@typegoose/typegoose';

@index({ lat: 'asc', lon: 'asc' })
export class Store {

    @prop({ unique: true, required: true })
    id: number;

    @prop({ required: true })
    type: string;

    @prop({ required: true })
    lat: number;

    @prop({ required: true })
    lon: number;

    @prop({ allowMixed: 0, type: () => Object })
    tags: Record<string, string>;
}

const storeModel = getModelForClass(Store);

export default storeModel;

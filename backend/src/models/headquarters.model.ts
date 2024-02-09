import { MapLocation } from './map-location';
import { getModelForClass, index, modelOptions, Prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@index({ location: '2dsphere' })
@modelOptions({
    schemaOptions: {
        collection: 'headquarters',
        timestamps: true
    }
})
export class Headquarters {
    @Prop({ auto: true })
    public _id?: Types.ObjectId;

    @Prop({ required: true, _id: false })
    public location!: MapLocation;
}

const headquartersModel = getModelForClass(Headquarters);

export default headquartersModel;
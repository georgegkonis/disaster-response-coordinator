import { MapLocation } from './map-location';
import { modelOptions, Prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@modelOptions({
    schemaOptions: {
        collection: 'headquarters',
        timestamps: true
    }
})
export class Headquarters {
    @Prop({ auto: true })
    public _id?: Types.ObjectId;

    @Prop({ required: true })
    public location!: MapLocation;
}
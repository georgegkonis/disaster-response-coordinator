import { MapLocation } from './map-location';
import { modelOptions, Prop } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        collection: 'headquarters',
        timestamps: true
    }
})
export class Headquarters {
    @Prop({ auto: true })
    public _id?: string;

    @Prop({ required: true })
    public location!: MapLocation;
}
import { getModelForClass, index, modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import { ItemRequestStatus } from '../enums/request-status.enum';
import { MapLocation } from './map-location';
import { User } from './user.model';
import { Item } from './item.model';
import { Types } from 'mongoose';

@index({ citizenId: 'asc', itemId: 'asc', status: 'asc' })
@modelOptions({
    schemaOptions: {
        collection: 'item_requests',
        timestamps: true
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
export class ItemRequest {
    @prop({ auto: true })
    public _id?: Types.ObjectId;

    @prop({ required: true, ref: () => Item })
    public item!: Ref<Item>;

    @prop({ required: true, ref: () => User })
    public citizen!: Ref<User>;

    @prop({ required: true })
    public description!: string;

    @prop({ required: true })
    public peopleCount!: number;

    @prop({ required: true, _id: false })
    public coordinates!: MapLocation;

    @prop({ default: ItemRequestStatus.PENDING })
    public status?: ItemRequestStatus;
}

const itemRequestModel = getModelForClass(ItemRequest);

export default itemRequestModel;
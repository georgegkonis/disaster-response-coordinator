import { getModelForClass, index, modelOptions, Prop, prop, Ref, Severity } from '@typegoose/typegoose';
import { TaskStatus } from '../enums/task-status.enum';
import { User } from './user.model';
import { Item } from './item.model';
import { Types } from 'mongoose';

@index({ item: 'asc', citizen: 'asc', status: 'asc', rescuer: 'asc', acceptedAt: 'desc' })
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

    @prop({ default: TaskStatus.PENDING })
    public status?: TaskStatus;

    @Prop({ ref: () => User })
    public rescuer?: Ref<User>;

    @Prop()
    public acceptedAt?: Date;
}

const itemRequestModel = getModelForClass(ItemRequest);

export default itemRequestModel;
import { getModelForClass, index, modelOptions, Prop, prop, Ref, Severity } from '@typegoose/typegoose';
import { TaskStatus } from '../enums/task-status.enum';
import { User } from './user.model';
import { Item } from './item.model';
import { Types } from 'mongoose';

@index({ item: 'asc', citizen: 'asc', status: 'asc', rescuer: 'asc', acceptedAt: 'desc' })
@modelOptions({
    schemaOptions: {
        collection: 'item_requests',
        timestamps: true,
        toJSON: { virtuals: true, versionKey: false },
        toObject: { virtuals: true, versionKey: false }
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

    // TODO: remove this field
    @prop()
    public description?: string;

    @prop({ required: true })
    public peopleCount!: number;

    @prop({ default: TaskStatus.PENDING })
    public status?: TaskStatus;

    @Prop({ ref: () => User })
    public rescuer?: Ref<User>;

    @Prop()
    public acceptedAt?: Date;

    @Prop()
    public completedAt?: Date;

    //#region Virtuals

    public id?: Types.ObjectId;

    public createdAt?: Date;

    public updatedAt?: Date;

    //#endregion
}

const itemRequestModel = getModelForClass(ItemRequest);

export default itemRequestModel;
import { Types } from 'mongoose';
import { getModelForClass, index, modelOptions, Prop, Ref, Severity } from '@typegoose/typegoose';
import { User } from './user.model';
import { Item } from './item.model';
import { TaskStatus } from '../enums/task-status.enum';

@index({ item: 'asc', citizen: 'asc', status: 'asc', rescuer: 'asc', acceptedAt: 'desc' })
@modelOptions({
    schemaOptions: {
        collection: 'item_offers',
        timestamps: true,
        toJSON: { virtuals: true, versionKey: false },
        toObject: { virtuals: true, versionKey: false }
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
export class ItemOffer {
    @Prop({ auto: true })
    public _id?: Types.ObjectId;

    @Prop({ required: true, ref: () => User })
    public citizen!: Ref<User>;

    @Prop({ required: true, ref: () => Item })
    public item!: Ref<Item>;

    @Prop({ required: true })
    public quantity!: number;

    @Prop({ default: TaskStatus.PENDING })
    public status?: TaskStatus;

    @Prop({ ref: () => User })
    public rescuer?: Ref<User>;

    @Prop()
    public acceptedAt?: Date;

    //#region Virtuals

    public id?: Types.ObjectId;

    public createdAt?: Date;

    public updatedAt?: Date;

    //#endregion
}

const itemOfferModel = getModelForClass(ItemOffer);

export default itemOfferModel;
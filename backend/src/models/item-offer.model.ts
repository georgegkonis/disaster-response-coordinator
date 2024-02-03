import { Types } from 'mongoose';
import { modelOptions, Prop, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import { Item } from './item.model';

@modelOptions({
    schemaOptions: {
        collection: 'item-offers',
        timestamps: true
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

    @Prop({ ref: () => User })
    public rescuer?: Ref<User>;

    @Prop()
    public pickedUpAt?: Date;
}
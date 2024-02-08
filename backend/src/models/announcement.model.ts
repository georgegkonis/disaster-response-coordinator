import { Item } from './item.model';
import { modelOptions, Prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@modelOptions({
    schemaOptions: {
        collection: 'announcements',
        timestamps: true
    }
})
export class Announcement {
    @Prop({ auto: true })
    public _id?: Types.ObjectId;

    @Prop({ required: true, ref: () => Item })
    public items!: Ref<Item>[];
}
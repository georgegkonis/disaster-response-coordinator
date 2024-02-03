import { Item } from './item.model';
import { modelOptions, Prop, Ref } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        collection: 'announcements',
        timestamps: true
    }
})
export class Announcement {
    @Prop({ auto: true })
    public _id?: string;

    @Prop({ required: true, ref: () => Item })
    public items!: Ref<Item>[];
}
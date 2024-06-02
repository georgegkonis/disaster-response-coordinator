import { Item } from './item.model';
import { getModelForClass, modelOptions, Prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@modelOptions({
    schemaOptions: {
        collection: 'announcements',
        timestamps: true,
        toJSON: { virtuals: true, versionKey: false },
        toObject: { virtuals: true, versionKey: false }
    }
})
export class Announcement {
    @Prop({ auto: true })
    public _id?: Types.ObjectId;

    @Prop({ required: true })
    public description!: string;

    @Prop({ required: true, ref: () => Item })
    public items!: Ref<Item>[];

    //#region Virtuals

    public id?: Types.ObjectId;

    public createdAt?: Date;

    public updatedAt?: Date;

    //#endregion
}

const announcementModel = getModelForClass(Announcement);

export default announcementModel;
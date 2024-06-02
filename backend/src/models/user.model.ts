import { getModelForClass, index, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { Role } from '../enums/role.enum';
import { Types } from 'mongoose';
import { MapLocation } from './map-location';

class Details {
    @prop({})
    public firstName?: string;

    @prop({})
    public lastName?: string;

    @prop({})
    public phoneNumber?: string;
}

@index({ username: 1, email: 1 })
@modelOptions({
    schemaOptions: {
        collection: 'users',
        timestamps: true,
        toJSON: { virtuals: true, versionKey: false },
        toObject: { virtuals: true, versionKey: false }
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
export class User {
    @prop({ auto: true, select: true })
    public _id?: Types.ObjectId;

    @prop({ unique: true, required: true })
    public username!: string;

    @prop({ unique: true, required: true })
    public email!: string;

    @prop({ required: true, select: false })
    public password!: string;

    @prop({ default: Role.CITIZEN })
    public role?: Role;

    @prop({ _id: false })
    public details?: Details;

    @prop({ _id: false })
    public location?: MapLocation;

    //#region Virtuals

    public id?: Types.ObjectId;

    public createdAt?: Date;

    public updatedAt?: Date;

    //#endregion
}

const userModel = getModelForClass(User);

export default userModel;
import { getModelForClass, index, modelOptions, prop, Severity } from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';
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
        timestamps: true
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

    async comparePasswords(hashedPassword: string, candidatePassword: string) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }
}

const userModel = getModelForClass(User);

export default userModel;


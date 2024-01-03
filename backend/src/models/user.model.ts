import { getModelForClass, index, modelOptions, pre, prop } from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';
import { Role } from '../enums/role.enum';
import { Types } from 'mongoose';

@index({ username: 1, email: 1 })
@pre<User>('save', async function () {
    if (!this.isModified('password')) return;
    this['password'] = await bcrypt.hash(this['password'], 12);
})
@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class User {
    @prop({ auto: true })
    _id: Types.ObjectId;

    @prop({ unique: true, required: true })
    username: string;

    @prop({ unique: true, required: true })
    email: string;

    @prop({ required: true, select: false })
    password: string;

    @prop({ default: Role.CITIZEN, allowMixed: 0 })
    role: Role;

    async comparePasswords(hashedPassword: string, candidatePassword: string) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }
}

const userModel = getModelForClass(User);
export default userModel;


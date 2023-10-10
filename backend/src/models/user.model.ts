import { getModelForClass, index, modelOptions, pre, prop } from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';
import { Role } from '../enums/role.enum';

@index({ username: 1, email: 1 })
@pre<User>('save', async function () {
    // Hash password if the password is new or was updated
    if (!this.isModified('password')) return;

    // Hash password with costFactor of 12
    this['password'] = await bcrypt.hash(this['password'], 12);
})
@modelOptions({
    schemaOptions: {
        // Add createdAt and updatedAt fields
        timestamps: true
    }
})

// Export the User class to be used as TypeScript type
export class User {
    @prop({ unique: true, required: true })
    username: string;

    @prop({ unique: true, required: true })
    email: string;

    @prop({ required: true, minlength: 8, maxLength: 32, select: false })
    password: string;

    @prop({ default: Role.USER })
    role: Role;

    @prop({ default: 0 })
    score: number;

    // Instance method to check if passwords match
    async comparePasswords(hashedPassword: string, candidatePassword: string) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }
}

// Create the user model from the User class
const userModel = getModelForClass(User);
export default userModel;


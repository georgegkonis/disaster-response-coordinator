import mongoose from 'mongoose';
import config from 'config';

const user: string = config.get<string>('username');
const password: string = config.get<string>('password');
const database: string = config.get<string>('database');

const url: string = `mongodb://${user}:${password}@localhost:6000/${database}?authSource=admin`;

const connectDb = async (): Promise<void> => {
    try {
        await mongoose.connect(url);
        console.log('Database connected...');
    } catch (error: any) {
        console.error(error.message);
        setTimeout(connectDb.call, 5000);
    }
};

export default connectDb;

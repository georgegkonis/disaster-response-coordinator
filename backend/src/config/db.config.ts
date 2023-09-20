import mongoose from 'mongoose';
import config from 'config';

const user: string = config.get<string>('username');
const password: string = config.get<string>('password');
const host: string = config.get<string>('host');
const port: string = config.get<string>('port');
const database: string = config.get<string>('database');

const url: string = `mongodb://${user}:${password}@${host}:${port}/${database}?authSource=admin`;

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(url);
        console.log('Database connected...');
    } catch (error: any) {
        console.error(error.message);
        setTimeout(connectDB.call, 5000);
    }
};

export default connectDB;

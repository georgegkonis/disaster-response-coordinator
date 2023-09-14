import mongoose from 'mongoose';
import config from 'config';

const username: string = config.get<string>('dbUsername');
const password: string = config.get<string>('dbPassword');
const database: string = config.get<string>('dbName');

const url: string = `mongodb://${username}:${password}@localhost:6000/${database}?authSource=admin`;

const connectDb = async (): Promise<void> => {
    try {
        await mongoose.connect(url);
        console.log('Database connected...');
    } catch (error: any) {
        console.log(error.message);
        setTimeout(connectDb.call, 5000);
    }
};

export default connectDb;


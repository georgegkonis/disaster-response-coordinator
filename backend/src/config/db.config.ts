import mongoose from 'mongoose';
import config from 'config';

const user: string = config.get<string>('db.username');
const password: string = config.get<string>('db.password');
const host: string = config.get<string>('db.host');
const port: string = config.get<string>('db.port');
const database: string = config.get<string>('db.database');
const authSource: string = config.get<string>('db.authSource');

const uri: string = `mongodb://${user}:${password}@${host}:${port}/${database}?authSource=${authSource}`;

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(uri);
        console.log('Database connected...');
    } catch (error: any) {
        console.error(error.message);
        setTimeout(connectDB.call, 5000);
    }
};

export default connectDB;

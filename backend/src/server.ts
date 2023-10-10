import { StatusCode } from './enums/status-code.enum';

require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.config';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import productRoute from './routes/product.route';
import multer from 'multer';
import categoryRoute from './routes/category.route';
import storeRoute from './routes/store.route';
import offerRoute from './routes/offer.route';

const app = express();

// Body Parser
app.use(express.json({ limit: '10kb' }));

// Cookie Parser
app.use(cookieParser());

// Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Cors
app.use(
    cors({
        origin: config.get<string>('origin'),
        credentials: true
    })
);

// File Upload
const upload = multer({ dest: 'uploads/' });
app.use(upload.any());

// Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', productRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/stores', storeRoute);
app.use('/api/offers', offerRoute);

// Unknown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = StatusCode.NOT_FOUND;
    next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || StatusCode.SERVER_ERROR;

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        additionalInfo: err.additionalInfo
    });
});

const port = config.get<number>('port');
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
    // ? call the connectDB function here
    connectDB();
});


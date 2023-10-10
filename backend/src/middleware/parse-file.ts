import fs from 'fs/promises';  // Import the Promises API of fs
import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums/status-code.enum';
import AppError from '../errors/app-error';

export const parseFileToJson = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.files || !Array.isArray(req.files)) {
        return next(new AppError('No file uploaded', StatusCode.BAD_REQUEST));
    }

    const file = req.files[0];

    if (!file || !file.path) {
        return next(new AppError('File path not found', StatusCode.BAD_REQUEST));
    }

    try {
        const rawData = await fs.readFile(file.path);
        req.body.jsonData = JSON.parse(rawData.toString());

        // Delete the file after reading its contents
        await fs.unlink(file.path);

        next();
    } catch (err: any) {
        next(err);
    }
};

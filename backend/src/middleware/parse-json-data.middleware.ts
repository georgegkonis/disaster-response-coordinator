import fs from 'fs/promises';
import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../errors/bad-request-error';

export const parseJsonData = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    if (!req.files || !Array.isArray(req.files)) {
        return next(new BadRequestError('No file uploaded'));
    }

    const file = req.files[0];

    if (!file || !file.path) {
        return next(new BadRequestError('File path not found'));
    }

    try {
        const rawData = await fs.readFile(file.path);
        req.body = JSON.parse(rawData.toString());

        // Delete the file after reading its contents
        await fs.unlink(file.path);

        next();
    } catch (err: any) {
        next(err);
    }
};

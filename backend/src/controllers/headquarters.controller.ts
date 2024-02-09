import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums/status-code.enum';
import { createHeadquarters, deleteHeadquarters, findHeadquarters } from '../services/headquarters.service';
import { CreateHeadquartersInput } from '../schemas/headquarters.schema';

export const createHeadquartersHandler = async (
    req: Request<{}, {}, CreateHeadquartersInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const headquarters = await createHeadquarters(req.body);

        res.status(StatusCode.CREATED).json(headquarters);
    } catch (error) {
        next(error);
    }
};

export const getHeadquartersHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const headquarters = await findHeadquarters(req.query);

        res.status(StatusCode.OK).json(headquarters);
    } catch (error) {
        next(error);
    }
};

export const deleteHeadquartersHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await deleteHeadquarters(req.params.id);

        res.status(StatusCode.NO_CONTENT).json();
    } catch (error) {
        next(error);
    }
};
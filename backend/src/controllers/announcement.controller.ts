import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums/status-code.enum';
import { createAnnouncement, deleteAnnouncement, deleteAnnouncements, findAnnouncements } from '../services/announcement.service';
import { CreateAnnouncementInput } from '../schemas/announcement.schema';
import { QueryOptions } from 'mongoose';
import { findItems } from '../services/item.service';
import NotFoundError from '../errors/not-found-error';

export const createAnnouncementHandler = async (
    req: Request<{}, {}, CreateAnnouncementInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        await verifyItems(req.body.items);

        const announcement = await createAnnouncement(req.body);

        res.status(StatusCode.CREATED).json(announcement);
    } catch (error) {
        next(error);
    }
};

export const getAnnouncementsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const options: QueryOptions = { populate: 'items' };

        const announcements = await findAnnouncements(req.query, options);

        res.status(StatusCode.OK).json(announcements);
    } catch (error) {
        next(error);
    }
};

export const deleteAnnouncementHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await deleteAnnouncement(req.params.id);

        res.status(StatusCode.NO_CONTENT).json();
    } catch (error) {
        next(error);
    }
};

export const deleteAnnouncementsHandler = async (
    req: Request<{}, {}, string[]>,
    res: Response,
    next: NextFunction
) => {
    try {
        await deleteAnnouncements(req.body);

        res.status(StatusCode.NO_CONTENT).json();
    } catch (error) {
        next(error);
    }
};

async function verifyItems(ids: string[]): Promise<void> {
    const foundItems = await findItems({ _id: { $in: ids } });

    if (foundItems.length !== ids.length) {
        const notFoundIds = ids.filter(id => !foundItems.find(item => item._id?.toHexString() === id));
        throw new NotFoundError('items', notFoundIds);
    }
}
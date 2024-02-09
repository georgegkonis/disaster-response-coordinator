import announcementModel, { Announcement } from '../models/announcement.model';
import { FilterQuery, QueryOptions } from 'mongoose';

export const createAnnouncement = async (
    input: Announcement
) => {
    const announcement: Announcement = await announcementModel.create<Announcement>(input);

    return announcement;
};

export const findAnnouncements = async (
    filter: FilterQuery<Announcement> = {},
    options: QueryOptions = {}
) => {
    const announcements: Announcement[] = await announcementModel.find<Announcement>(filter, {}, options);

    return announcements;
};

export const deleteAnnouncement = async (
    id: string
) => {
    await announcementModel.findByIdAndDelete(id);
};
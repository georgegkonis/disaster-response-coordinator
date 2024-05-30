import { Item } from './item.model';

export interface Announcement {
    id: string;
    description: string;
    items: string[] | Item[];
}
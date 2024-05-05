import { Item } from './item.model';

export interface Announcement {
    id: string;
    items: string[] | Item[];
}
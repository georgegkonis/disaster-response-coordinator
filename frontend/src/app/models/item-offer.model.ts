import { User } from './user.model';
import { Item } from './item.model';
import { TaskStatus } from '../enums/task-status.enum';

export interface ItemOffer {
    _id: string;
    citizen: string | User;
    item: string | Item;
    quantity: number;
    status: TaskStatus;
    rescuer?: string | User;
    acceptedAt?: Date;
}
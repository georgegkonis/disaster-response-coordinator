import { Item } from './item.model';
import { User } from './user.model';
import { TaskStatus } from '../enums/task-status.enum';

export interface ItemRequest {
    id: string;
    item: string | Item;
    citizen: string | User;
    description: string;
    peopleCount: number;
    status: TaskStatus;
    rescuer?: string | User;
    acceptedAt?: Date;
}
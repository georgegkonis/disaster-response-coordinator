import { Item } from './item.model';
import { User } from './user.model';
import { TaskStatus } from '../enums/task-status.enum';

export interface ItemRequest {
    id: string;
    item: string | Item;
    citizen: User;
    peopleCount: number;
    status: TaskStatus;
    rescuer?: User;
    createdAt: Date;
    updatedAt: Date;
    acceptedAt?: Date;
}
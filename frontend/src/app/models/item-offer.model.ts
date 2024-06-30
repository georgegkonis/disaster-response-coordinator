import { User } from './user.model';
import { Item } from './item.model';
import { TaskStatus } from '../enums/task-status.enum';

export interface ItemOffer {
    id: string;
    citizen: User;
    item: Item;
    quantity: number;
    status: TaskStatus;
    rescuer?: User;
    createdAt: Date;
    updatedAt: Date;
    acceptedAt?: Date;
}
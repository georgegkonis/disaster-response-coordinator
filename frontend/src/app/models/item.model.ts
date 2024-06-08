import { Category } from './category.model';
import { ItemDetail } from './item-detail.model';

export interface Item {
    id: string;
    code: number;
    name: string;
    category: Category;
    details: ItemDetail[];
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}
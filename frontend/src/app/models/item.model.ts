import { Category } from './category.model';

export interface Item {
    _id: string;
    code: number;
    name: string;
    category: string | Category;
    details: { name: string; value: string; }[];
    quantity: number;
}
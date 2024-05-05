import { Category } from './category.model';

export interface Item {
    id: number;
    name: string;
    category: string | Category;
    details: {
        name: string;
        value: string;
    }[];
    quantity: number;
}
export interface Item {
    id: number;
    name: string;
    category: string;
    details: {
        name: string;
        value: string;
    }[];
    quantity: number;
}
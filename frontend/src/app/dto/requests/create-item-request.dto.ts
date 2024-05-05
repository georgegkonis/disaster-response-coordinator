export interface CreateItemRequest {
    name: string;
    category: string;
    details: {
        name: string;
        value: string;
    }[];
}
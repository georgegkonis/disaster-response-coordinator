export interface Product {
    id: number;
    name: string;
    category: string;
    subcategory: string;
    prices: Array<Price>;
}

export interface Category {
    id: string;
    name: string;
    subcategories: Array<Subcategory>;
}

export interface Subcategory {
    uuid: string;
    name: string;
}

export interface Offer {
    id: string;
    creatorId: string;
    productId: string;
    categoryId: string;
    storeId: string;
    price: number;
    likes: number;
    dislikes: number;
}

export interface ComStore {
    id: number;
    type: string;
    lat: number;
    lon: number;
    tags: Record<string, string>;
}

export interface Price {
    price: number;
    date: Date;
}

export interface ProductHierarchy {
    category: string;
    subcategory: string;
    products: Array<Product>;
}
import { Inject, Injectable } from '@angular/core';
import { APP_SETTINGS, AppSettings } from '../settings/settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerResponse } from '../dto/responses/server-response.dto';
import { CreateCategoryRequest } from '../dto/requests/create-category-request.dto';
import { Category } from '../models/category.model';
import { CreateItemRequest } from '../dto/requests/create-item-request.dto';
import { Item } from '../models/item.model';
import { GetCategoriesRequest } from '../dto/requests/get-categories-request.dto';
import { GetItemsRequest } from '../dto/requests/get-items-request.dto';
import { UpdateItemQuantityRequest } from '../dto/requests/update-item-quantity-request.dto';

@Injectable({
    providedIn: 'root'
})
export class WarehouseService {

    private readonly baseUrl: string;

    constructor(
        @Inject(APP_SETTINGS) settings: AppSettings,
        private httpClient: HttpClient
    ) {
        this.baseUrl = `${settings.apiUrl}/warehouse`;
    }

    upload(file: File): Observable<ServerResponse<void>> {
        const url: string = `${this.baseUrl}/upload`;
        const formData: FormData = new FormData();
        formData.append('file', file);

        return this.httpClient.post<ServerResponse<void>>(url, formData);
    }

    createCategory(request: CreateCategoryRequest): Observable<Category> {
        const url: string = `${this.baseUrl}/categories`;

        return this.httpClient.post<Category>(url, request);
    }

    createItem(request: CreateItemRequest): Observable<Item> {
        const url: string = `${this.baseUrl}/items`;

        return this.httpClient.post<Item>(url, request);
    }

    getCategories(request: GetCategoriesRequest): Observable<Category[]> {
        const url: string = `${this.baseUrl}/categories`;
        const params: HttpParams = new HttpParams({ fromObject: request as any });

        return this.httpClient.get<Category[]>(url, { params });
    }

    getItems(request: GetItemsRequest): Observable<Item[]> {
        const url: string = `${this.baseUrl}/items`;
        const params: HttpParams = new HttpParams({ fromObject: request as any });

        return this.httpClient.get<Item[]>(url, { params });
    }

    updateItemQuantity(itemId: string, request: UpdateItemQuantityRequest): Observable<Item> {
        const url: string = `${this.baseUrl}/items/${itemId}/quantity`;

        return this.httpClient.patch<Item>(url, request);
    }

    deleteAllCategoriesAndItems(): Observable<void> {
        const url: string = `${this.baseUrl}`;

        return this.httpClient.delete<void>(url);
    }
}
import { Inject, Injectable } from '@angular/core';
import { APP_SETTINGS, AppSettings } from '../settings/settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerResponse } from '../dto/responses/server-response.dto';
import { CreateCategoryRequest } from '../dto/requests/create-category-request.dto';
import { Category } from '../models/category.model';
import { CreateItemRequest } from '../dto/requests/create-item-request.dto';
import { Item } from '../models/item.model';
import { LoadCategoriesRequest } from '../dto/requests/load-categories-request.dto';
import { LoadItemsRequest } from '../dto/requests/load-items-request.dto';
import { UpdateItemRequest } from '../dto/requests/update-item-request.dto';
import { UpdateCategoryRequest } from '../dto/requests/update-category-request.dto';
import { DeleteManyRequest } from '../dto/requests/delete-many-request.dto';

const API_PATH: string = 'warehouse';

@Injectable({
    providedIn: 'root'
})
export class WarehouseService {

    private readonly baseUrl: string;
    private readonly itemsUrl: string;
    private readonly categoriesUrl: string;

    constructor(
        @Inject(APP_SETTINGS) settings: AppSettings,
        private httpClient: HttpClient
    ) {
        this.baseUrl = `${settings.apiUrl}/${API_PATH}`;
        this.itemsUrl = `${this.baseUrl}/items`;
        this.categoriesUrl = `${this.baseUrl}/categories`;
    }

    //#region Warehouse

    upload(file: File): Observable<ServerResponse<void>> {
        const url: string = `${this.baseUrl}/upload`;
        const formData: FormData = new FormData();
        formData.append('file', file);

        return this.httpClient.post<ServerResponse<void>>(url, formData);
    }

    deleteAll(): Observable<void> {
        const url: string = `${this.baseUrl}`;

        return this.httpClient.delete<void>(url);
    }

    //#endregion

    //#region Categories

    createCategory(request: CreateCategoryRequest): Observable<Category> {
        const url: string = `${this.categoriesUrl}`;

        return this.httpClient.post<Category>(url, request);
    }

    getCategories(request: LoadCategoriesRequest): Observable<Category[]> {
        const url: string = `${this.categoriesUrl}`;
        const params: HttpParams = new HttpParams({ fromObject: request as any });

        return this.httpClient.get<Category[]>(url, { params });
    }

    updateCategory(categoryId: string, request: UpdateCategoryRequest): Observable<Category> {
        const url: string = `${this.categoriesUrl}/${categoryId}`;

        return this.httpClient.patch<Category>(url, request);
    }

    removeCategory(categoryId: string): Observable<void> {
        const url: string = `${this.categoriesUrl}/${categoryId}`;

        return this.httpClient.delete<void>(url);
    }

    removeCategories(request: DeleteManyRequest): Observable<void> {
        const url: string = `${this.categoriesUrl}`;

        return this.httpClient.delete<void>(url, { body: request });
    }

    //#endregion

    //#region Items

    createItem(request: CreateItemRequest): Observable<Item> {
        const url: string = `${this.itemsUrl}`;

        return this.httpClient.post<Item>(url, request);
    }

    getItems(request: LoadItemsRequest): Observable<Item[]> {
        const url: string = `${this.itemsUrl}`;
        const params: HttpParams = new HttpParams({ fromObject: request as any });

        return this.httpClient.get<Item[]>(url, { params });
    }

    updateItem(itemId: string, request: UpdateItemRequest): Observable<Item> {
        const url: string = `${this.itemsUrl}/${itemId}`;

        return this.httpClient.patch<Item>(url, request);
    }

    removeItem(itemId: string): Observable<void> {
        const url: string = `${this.itemsUrl}/${itemId}`;

        return this.httpClient.delete<void>(url);
    }

    removeItems(request: DeleteManyRequest): Observable<void> {
        const url: string = `${this.itemsUrl}`;

        return this.httpClient.delete<void>(url, { body: request });
    }

    //#endregion
}
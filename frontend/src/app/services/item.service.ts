import { Inject, Injectable } from '@angular/core';
import { CreateItemRequest } from '../dto/requests/create-item-request.dto';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { LoadItemsRequest } from '../dto/requests/load-items-request.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UpdateItemRequest } from '../dto/requests/update-item-request.dto';
import { DeleteManyRequest } from '../dto/requests/delete-many-request.dto';
import { APP_SETTINGS, AppSettings } from '../settings/settings';

const API_PATH: string = 'items';

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    private readonly baseUrl: string;

    constructor(
        @Inject(APP_SETTINGS) settings: AppSettings,
        private httpClient: HttpClient
    ) {
        this.baseUrl = `${settings.apiUrl}/${API_PATH}`;
    }

    find(request: LoadItemsRequest): Observable<Item[]> {
        const url: string = `${this.baseUrl}`;
        const params: HttpParams = new HttpParams({ fromObject: request as any });

        return this.httpClient.get<Item[]>(url, { params });
    }

    create(request: CreateItemRequest): Observable<Item> {
        const url: string = `${this.baseUrl}`;

        return this.httpClient.post<Item>(url, request);
    }

    update(itemId: string, request: UpdateItemRequest): Observable<Item> {
        const url: string = `${this.baseUrl}/${itemId}`;

        return this.httpClient.patch<Item>(url, request);
    }

    remove(itemId: string): Observable<void> {
        const url: string = `${this.baseUrl}/${itemId}`;

        return this.httpClient.delete<void>(url);
    }

    removeMany(request: DeleteManyRequest): Observable<void> {
        const url: string = `${this.baseUrl}`;

        return this.httpClient.delete<void>(url, { body: request });
    }
}
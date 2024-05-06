import { APP_SETTINGS, AppSettings } from '../settings/settings';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ItemRequest } from '../models/item-request.model';
import { Observable } from 'rxjs';
import { TaskStatus } from '../enums/task-status.enum';
import { CreateItemRequestRequest } from '../dto/requests/create-item-request-request.dto';

const PATH: string = '/item-requests';

@Injectable({
    providedIn: 'root'
})
export class ItemRequestService {

    private readonly baseUrl: string;

    constructor(
        @Inject(APP_SETTINGS) settings: AppSettings,
        private httpClient: HttpClient
    ) {
        this.baseUrl = `${settings.apiUrl}/${PATH}`;
    }

    create(request: CreateItemRequestRequest): Observable<ItemRequest> {
        const url: string = `${this.baseUrl}`;

        return this.httpClient.post<ItemRequest>(url, request);
    }

    get(status?: TaskStatus, item?: string, citizen?: string): Observable<ItemRequest[]> {
        const url: string = `${this.baseUrl}`;
        const params: HttpParams = new HttpParams();

        if (status) params.set('status', status);
        if (item) params.set('item', item);
        if (citizen) params.set('citizen', citizen);

        return this.httpClient.get<ItemRequest[]>(url);
    }

    getMine(status?: TaskStatus, item?: string): Observable<ItemRequest[]> {
        const url: string = `${this.baseUrl}/me`;
        const params: HttpParams = new HttpParams();

        if (status) params.set('status', status);
        if (item) params.set('item', item);

        return this.httpClient.get<ItemRequest[]>(url);
    }

    updateStatus(id: string, status: TaskStatus): Observable<ItemRequest> {
        const url: string = `${this.baseUrl}/${id}/status`;

        return this.httpClient.patch<ItemRequest>(url, { status });
    }

    delete(id: string): Observable<void> {
        const url: string = `${this.baseUrl}/${id}`;

        return this.httpClient.delete<void>(url);
    }
}
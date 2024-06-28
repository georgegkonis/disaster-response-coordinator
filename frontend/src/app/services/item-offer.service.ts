import { Inject, Injectable } from '@angular/core';
import { APP_SETTINGS, AppSettings } from '../settings/settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateItemOfferRequest } from '../dto/requests/create-item-offer-request.dto';
import { TaskStatus } from '../enums/task-status.enum';
import { Observable } from 'rxjs';
import { ItemOffer } from '../models/item-offer.model';

const API_PATH: string = 'item-offers';

@Injectable({
    providedIn: 'root'
})
export class ItemOfferService {

    private readonly baseUrl: string;

    constructor(
        @Inject(APP_SETTINGS) settings: AppSettings,
        private httpClient: HttpClient
    ) {
        this.baseUrl = `${settings.apiUrl}/${API_PATH}`;
    }

    create(request: CreateItemOfferRequest): Observable<ItemOffer> {
        const url: string = `${this.baseUrl}`;

        return this.httpClient.post<ItemOffer>(url, request);
    }

    find(status?: TaskStatus, item?: string, citizen?: string): Observable<ItemOffer[]> {
        const url: string = `${this.baseUrl}`;
        let params: HttpParams = new HttpParams();

        if (status) params = params.set('status', status);
        if (item) params = params.set('item', item);
        if (citizen) params = params.set('citizen', citizen);

        return this.httpClient.get<ItemOffer[]>(url, { params });
    }

    findMine(status?: TaskStatus, item?: string): Observable<ItemOffer[]> {
        const url: string = `${this.baseUrl}/me`;
        let params: HttpParams = new HttpParams();

        if (status) params = params.set('status', status);
        if (item) params = params.set('item', item);

        return this.httpClient.get<ItemOffer[]>(url, { params });
    }

    updateStatus(id: string, status: TaskStatus): Observable<ItemOffer> {
        const url: string = `${this.baseUrl}/${id}/status`;
        const body: Partial<ItemOffer> = { status };

        return this.httpClient.patch<ItemOffer>(url, body);
    }

    delete(id: string): Observable<void> {
        const url: string = `${this.baseUrl}/${id}`;

        return this.httpClient.delete<void>(url);
    }
}
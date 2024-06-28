import { Inject, Injectable } from '@angular/core';
import { APP_SETTINGS, AppSettings } from '../settings/settings';
import { HttpClient } from '@angular/common/http';
import { Headquarters } from '../models/headquarters.model';
import { Observable } from 'rxjs';
import { CreateHeadquartersRequest } from '../dto/requests/create-headquarters-request.dto';

const API_PATH: string = 'headquarters';

@Injectable({
    providedIn: 'root'
})
export class HeadquartersService {

    private readonly baseUrl: string;

    constructor(
        @Inject(APP_SETTINGS) settings: AppSettings,
        private httpClient: HttpClient
    ) {
        this.baseUrl = `${settings.apiUrl}/${API_PATH}`;
    }

    create(request: CreateHeadquartersRequest): Observable<Headquarters> {
        const url: string = `${this.baseUrl}`;

        return this.httpClient.post<Headquarters>(url, request);
    }

    find(): Observable<Headquarters[]> {
        const url: string = `${this.baseUrl}`;

        return this.httpClient.get<Headquarters[]>(url);
    }

    delete(id: string): Observable<void> {
        const url: string = `${this.baseUrl}/${id}`;

        return this.httpClient.delete<void>(url);
    }
}
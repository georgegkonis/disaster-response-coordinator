import { Inject, Injectable } from '@angular/core';
import { APP_SETTINGS, AppSettings } from '../settings/settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerResponse } from '../dto/responses/server-response.dto';

const API_PATH: string = 'warehouse';

@Injectable({
    providedIn: 'root'
})
export class WarehouseService {

    private readonly baseUrl: string;

    constructor(
        @Inject(APP_SETTINGS) settings: AppSettings,
        private httpClient: HttpClient
    ) {
        this.baseUrl = `${settings.apiUrl}/${API_PATH}`;
    }

    importData(file: File): Observable<ServerResponse<void>> {
        const url: string = `${this.baseUrl}/import`;
        const formData: FormData = new FormData();
        formData.append('file', file);

        return this.httpClient.put<ServerResponse<void>>(url, formData);
    }

    exportData(): Observable<Blob> {
        const url: string = `${this.baseUrl}/export`;

        return this.httpClient.get(url, { responseType: 'blob' });
    }

    clearData(): Observable<void> {
        const url: string = `${this.baseUrl}`;

        return this.httpClient.delete<void>(url);
    }
}
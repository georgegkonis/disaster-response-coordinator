import { Inject, Injectable } from '@angular/core';
import { APP_SETTINGS, AppSettings } from '../settings/settings';
import { HttpClient } from '@angular/common/http';
import { Announcement } from '../models/announcement.model';
import { Observable } from 'rxjs';
import { CreateAnnouncementRequest } from '../dto/requests/create-announcement-request.dto';

const API_PATH: string = 'announcements';

@Injectable({
    providedIn: 'root'
})
export class AnnouncementService {

    private readonly baseUrl: string;

    constructor(
        @Inject(APP_SETTINGS) settings: AppSettings,
        private httpClient: HttpClient
    ) {
        this.baseUrl = `${settings.apiUrl}/${API_PATH}`;
    }

    create(request: CreateAnnouncementRequest): Observable<Announcement> {
        const url: string = `${this.baseUrl}`;

        return this.httpClient.post<Announcement>(url, request);
    }

    getAll(): Observable<Announcement[]> {
        const url: string = `${this.baseUrl}`;

        return this.httpClient.get<Announcement[]>(url);
    }

    delete(id: string): Observable<void> {
        const url: string = `${this.baseUrl}/${id}`;

        return this.httpClient.delete<void>(url);
    }
}
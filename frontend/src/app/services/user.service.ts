import { Inject, Injectable } from '@angular/core';
import { APP_SETTINGS, AppSettings } from '../settings/settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { CreateUserRequest } from '../dto/requests/create-user-request.dto';
import { UpdateUserRequest } from '../dto/requests/update-user-request.dto';
import { UserRole } from '../enums/user-role.enum';
import { MapLocation } from '../models/map-location.model';

const API_PATH: string = 'users';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly baseUrl: string;

    constructor(
        @Inject(APP_SETTINGS) settings: AppSettings,
        private httpClient: HttpClient
    ) {
        this.baseUrl = `${settings.apiUrl}/${API_PATH}`;
    }

    create(request: CreateUserRequest): Observable<User> {
        const url: string = `${this.baseUrl}`;

        return this.httpClient.post<User>(url, request);
    }

    // TODO: find a better way to convert object to query params
    find(role?: UserRole): Observable<User[]> {
        const url: string = `${this.baseUrl}`;
        let params: HttpParams = new HttpParams();

        if (role) params = params.set('role', role);

        return this.httpClient.get<User[]>(url, { params });
    }

    getMe(): Observable<User> {
        const url: string = `${this.baseUrl}/me`;

        return this.httpClient.get<User>(url);
    }

    get(id: string): Observable<User> {
        const url: string = `${this.baseUrl}/${id}`;

        return this.httpClient.get<User>(url);
    }

    updateMe(request: UpdateUserRequest): Observable<User> {
        const url: string = `${this.baseUrl}/me`;

        return this.httpClient.patch<User>(url, request);
    }

    updateMyLocation(location: MapLocation): Observable<void> {
        const url: string = `${this.baseUrl}/me/location`;

        return this.httpClient.patch<void>(url, location);
    }

    updateMyInventory(item: string, quantity: number): Observable<User> {
        const url: string = `${this.baseUrl}/me/inventory`;

        return this.httpClient.patch<User>(url, { item, quantity });
    }

    deleteMe(): Observable<void> {
        const url: string = `${this.baseUrl}/me`;

        return this.httpClient.delete<void>(url);
    }

    delete(id: string): Observable<void> {
        const url: string = `${this.baseUrl}/${id}`;

        return this.httpClient.delete<void>(url);
    }
}

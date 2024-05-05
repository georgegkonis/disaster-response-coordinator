import { Inject, Injectable } from '@angular/core';
import { APP_SETTINGS, AppSettings } from '../settings/settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UpdateUserLocationRequest } from '../dto/requests/update-user-location-request.dto';
import { CreateUserRequest } from '../dto/requests/create-user-request.dto';
import { GetUsersRequest } from '../dto/requests/get-users-request.dto';
import { UpdateUserRequest } from '../dto/requests/update-user-request.dto';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly baseUrl: string;

    constructor(
        @Inject(APP_SETTINGS) settings: AppSettings,
        private httpClient: HttpClient
    ) {
        this.baseUrl = `${settings.apiUrl}/users`;
    }

    create(request: CreateUserRequest): Observable<User> {
        const url: string = `${this.baseUrl}`;

        return this.httpClient.post<User>(url, request);
    }

    // TODO: find a better way to convert object to query params
    getAll(request: GetUsersRequest): Observable<User[]> {
        const url: string = `${this.baseUrl}`;
        const params: HttpParams = new HttpParams({ fromObject: request as any });

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

    updateMyLocation(request: UpdateUserLocationRequest): Observable<void> {
        const url: string = `${this.baseUrl}/me/location`;

        return this.httpClient.patch<void>(url, request);
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

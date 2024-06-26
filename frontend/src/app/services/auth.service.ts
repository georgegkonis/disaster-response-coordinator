import { APP_SETTINGS, AppSettings } from '../settings/settings';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../dto/requests/login-request.dto';
import { RegisterRequest } from '../dto/requests/register-request.dto';
import { ServerResponse } from '../dto/responses/server-response.dto';

const API_PATH: string = 'auth';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly baseUrl: string;

    constructor(
        @Inject(APP_SETTINGS) settings: AppSettings,
        private httpClient: HttpClient
    ) {
        this.baseUrl = `${settings.apiUrl}/${API_PATH}`;
    }

    login(request: LoginRequest): Observable<ServerResponse<void>> {
        const url: string = `${this.baseUrl}/login`;

        return this.httpClient.post<ServerResponse<void>>(url, request);
    };

    register(request: RegisterRequest): Observable<ServerResponse<void>> {
        const url: string = `${this.baseUrl}/register`;

        return this.httpClient.post<ServerResponse<void>>(url, request);
    }

    logout(): Observable<ServerResponse<void>> {
        const url: string = `${this.baseUrl}/logout`;

        return this.httpClient.post<ServerResponse<void>>(url, {});
    }
}

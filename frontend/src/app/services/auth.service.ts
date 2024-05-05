import { APP_SETTINGS, AppSettings } from '../settings/settings';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../dto/responses/login-response.dto';
import { LoginRequest } from '../dto/requests/login-request.dto';
import { RegisterRequest } from '../dto/requests/register-request.dto';
import { ServerResponse } from '../dto/responses/server-response.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly baseUrl: string = '';

    constructor(
        @Inject(APP_SETTINGS) settings: AppSettings,
        private httpClient: HttpClient
    ) {
        this.baseUrl = `${settings.apiUrl}/auth`;
    }

    login(request: LoginRequest): Observable<ServerResponse<LoginResponse>> {
        const url: string = `${this.baseUrl}/login`;

        return this.httpClient.post<ServerResponse<LoginResponse>>(url, request);
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

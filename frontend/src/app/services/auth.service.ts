import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, RegisterRequest } from '../models/requests.model';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/responses.model';

const baseUrl = 'http://localhost:8000/api';
const authUrl = baseUrl + '/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient
    ) { }

    login(request: LoginRequest): Observable<LoginResponse> {
        return this.http.post(authUrl + '/login', request) as Observable<LoginResponse>;
    };

    register(request: RegisterRequest) {
        return this.http.post(authUrl + '/register', request);
    }
}

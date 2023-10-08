import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, RegisterRequest } from '../models/requests.model';
import { mapTo, Observable } from 'rxjs';
import { LoginResponse } from '../models/responses.model';
import { map } from 'rxjs/operators';

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
        return this.http.post<LoginResponse>(authUrl + '/login', request);
    };

    register(request: RegisterRequest) {
        return this.http.post(authUrl + '/register', request);
    }

    logout(): Observable<void> {
        return this.http.post<void>(authUrl + '/logout', {});
    }

}

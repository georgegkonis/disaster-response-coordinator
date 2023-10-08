import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, RegisterRequest } from '../models/requests.model';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8000/api';
const authUrl = baseUrl + '/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient
    ) { }

    login(request: LoginRequest): Observable<Object> {
        return this.http.post(authUrl + '/login', request);
    };

    register(request: RegisterRequest) {
        return this.http.post(authUrl + '/register', request);
    }
}

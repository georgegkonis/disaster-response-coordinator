import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { GetUsersResponse } from '../models/responses.model';

const baseUrl = 'http://localhost:8000/api';
const usersUrl = baseUrl + '/users';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient
    ) { }

    getCurrent(): Observable<User> {
        return this.http.get<User>(usersUrl + '/me');
    }

    getAll(): Observable<GetUsersResponse> {
        return this.http.get<GetUsersResponse>(usersUrl);
    }
}

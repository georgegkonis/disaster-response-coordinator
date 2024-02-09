import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { GetUsersResponse } from '../models/responses.model';
import { UpdateUserRequest } from '../models/requests.model';

const baseUrl = 'http://localhost:8000/disaster-response-coordinator/v1';
const usersUrl = baseUrl + '/users';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient
    ) { }

    getAll(): Observable<GetUsersResponse> {
        return this.http.get<GetUsersResponse>(usersUrl);
    }

    getCurrent(): Observable<User> {
        return this.http.get<User>(usersUrl + '/me');
    }

    updateCurrent(request: UpdateUserRequest): Observable<User> {
        return this.http.patch<User>(usersUrl + '/me', request);
    }
}

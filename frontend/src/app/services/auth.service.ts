import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private url = 'http://localhost:8080/api/auth';

    constructor(
        private http: HttpClient
    ) { }

    login(username: string, password: string) {
        return this.http.post(this.url + '/login', { username, password });
    };

    logout() {
        return this.http.get(this.url + '/logout');
    };

}

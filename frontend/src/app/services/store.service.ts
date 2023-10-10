import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComStore } from '../models/app.model';

const url = 'http://localhost:8000/api/stores';

@Injectable({
    providedIn: 'root'
})
export class StoreService {

    constructor(
        private http: HttpClient
    ) { }

    getAll(name?: string, categoryId?: string): Observable<ComStore[]> {
        let params = new HttpParams();

        if (name) params = params.set('name', name);
        if (categoryId) params = params.set('categoryId', categoryId);

        return this.http.get<ComStore[]>(`${url}`, { params: params });
    }

    deleteAll(): Observable<void> {
        return this.http.delete<void>(`${url}/all`);
    }
}

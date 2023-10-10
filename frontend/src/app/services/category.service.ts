import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/app.model';

const url = 'http://localhost:8000/api/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    constructor(
        private http: HttpClient
    ) { }

    getAll(): Observable<Category[]> {
        return this.http.get<Category[]>(url);
    }

    deleteAll(): Observable<void> {
        return this.http.delete<void>(`${url}/all`);
    }

    getAllWithProducts(): Observable<any> {
        return this.http.get<any>(`${url}/all`);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = 'http://localhost:8000/api/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    constructor(
        private http: HttpClient
    ) { }

    deleteAll(): Observable<void> {
        return this.http.delete<void>(`${url}/all`);
    }
}

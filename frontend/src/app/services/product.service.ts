import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const url = 'http://localhost:8000/api/products';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private http: HttpClient
    ) { }

    deleteAll(): Observable<void> {
        return this.http.delete<void>(`${url}/all`);
    }
}

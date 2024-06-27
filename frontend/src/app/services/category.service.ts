import { Inject, Injectable } from '@angular/core';
import { CreateCategoryRequest } from '../dto/requests/create-category-request.dto';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { LoadCategoriesRequest } from '../dto/requests/load-categories-request.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UpdateCategoryRequest } from '../dto/requests/update-category-request.dto';
import { DeleteManyRequest } from '../dto/requests/delete-many-request.dto';
import { APP_SETTINGS, AppSettings } from '../settings/settings';

const API_PATH: string = 'categories';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private readonly baseUrl: string;

    constructor(
        @Inject(APP_SETTINGS) settings: AppSettings,
        private httpClient: HttpClient
    ) {
        this.baseUrl = `${settings.apiUrl}/${API_PATH}`;
    }

    find(request: LoadCategoriesRequest): Observable<Category[]> {
        const url: string = `${this.baseUrl}`;
        const params: HttpParams = new HttpParams({ fromObject: request as any });

        return this.httpClient.get<Category[]>(url, { params });
    }

    create(request: CreateCategoryRequest): Observable<Category> {
        const url: string = `${this.baseUrl}`;

        return this.httpClient.post<Category>(url, request);
    }

    update(categoryId: string, request: UpdateCategoryRequest): Observable<Category> {
        const url: string = `${this.baseUrl}/${categoryId}`;

        return this.httpClient.patch<Category>(url, request);
    }

    delete(categoryId: string): Observable<void> {
        const url: string = `${this.baseUrl}/${categoryId}`;

        return this.httpClient.delete<void>(url);
    }

    deleteMany(request: DeleteManyRequest): Observable<void> {
        const url: string = `${this.baseUrl}`;

        return this.httpClient.delete<void>(url, { body: request });
    }
}
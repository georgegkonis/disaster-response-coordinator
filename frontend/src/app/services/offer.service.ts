import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Offer } from '../models/app.model';
import { Observable } from 'rxjs';

const url = 'http://localhost:8000/api/offers';

@Injectable({
    providedIn: 'root'
})
export class OfferService {

    constructor(
        private http: HttpClient
    ) { }

    getAllOffers(categoryId?: string, storeId?: number, creatorId?: string) {
        let queryParams = new HttpParams();  // Use let instead of const

        if (categoryId) queryParams = queryParams.append('categoryId', categoryId);
        if (storeId) queryParams = queryParams.append('storeId', storeId);
        if (creatorId) queryParams = queryParams.append('creatorId', creatorId);

        return this.http.get<Offer[]>(url, { params: queryParams });
    }

    getOffer(id: string): Observable<Offer> {
        return this.http.get<Offer>(url + `/${id}`);
    }

    createOffer(offer: Offer) {
        return this.http.post<Offer>(url, offer);
    }

    deleteOffer(id: string): Observable<void> {
        return this.http.delete<void>(url + `/${id}`);
    }

    rateOffer(id: string, positive: boolean): Observable<void> {
        return this.http.post<void>(url + `${id}/rate`, { positive });
    }
}

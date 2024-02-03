import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComStore, Offer } from '../../models/app.model';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { OfferService } from '../../services/offer.service';

@Component({
    selector: 'app-view-offer',
    templateUrl: './view-offer.component.html',
    styleUrls: ['./view-offer.component.scss']
})
export class ViewOfferComponent implements OnInit {

    @Input() comStore!: ComStore;
    @Output() addOfferClick: EventEmitter<boolean> = new EventEmitter<boolean>();

    offers: Offer[] = [];
    isAddOfferDisabled: boolean = false;

    constructor(
        private store: Store<AppState>,
        private offerService: OfferService
    ) { }

    ngOnInit(): void {
        const storeId = this.comStore?.id;

        this.offerService.getAllOffers(undefined, storeId)
            .subscribe((offers) => this.offers = offers);

        this.isAddOfferDisabled = this.calculateDistance() > 50;
    }

    onAddOfferClick(): void {
        this.addOfferClick.emit(true);
    }

    calculateDistance = (): number => {
        let distance = 0;

        navigator.geolocation.getCurrentPosition((position) => {
            const R = 6371e3; // Earth radius in meters
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
            const storeLat = this.comStore.lat;
            const storeLon = this.comStore.lon;

            const f1 = userLat * Math.PI / 180; // φ, λ in radians
            const f2 = storeLat * Math.PI / 180;
            const df = (storeLat - userLat) * Math.PI / 180;
            const dl = (storeLon - userLon) * Math.PI / 180;

            const a = Math.sin(df / 2) * Math.sin(df / 2) + Math.cos(f1) * Math.cos(f2) * Math.sin(dl / 2) * Math.sin(dl / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            distance = R * c;
        });
        return distance;
    };
}

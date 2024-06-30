import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/app.reducer';
import { headquartersSelector, itemOffersSelector, itemRequestsSelector, itemsSelector } from '../../store/selectors/app.selector';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { UserRole } from '../../enums/user-role.enum';
import { CookieService } from 'ngx-cookie-service';
import { ItemOfferActions } from '../../store/actions/item-offer.actions';
import { ItemRequestActions } from '../../store/actions/item-request.actions';
import { HeadquartersActions } from '../../store/actions/headquarters.actions';
import { Headquarters } from '../../models/headquarters.model';
import { ItemRequest } from '../../models/item-request.model';
import { ItemOffer } from '../../models/item-offer.model';
import { Item } from '../../models/item.model';
import { ItemActions } from '../../store/actions/item.actions';

@Component({
    selector: 'app-map',
    templateUrl: './offers-map.component.html',
    styleUrls: ['./offers-map.component.scss']
})
export class OffersMapComponent implements OnInit, AfterViewInit, OnDestroy {

    private readonly unsubscribe$ = new Subject<void>();

    private readonly headquarters$: Observable<Headquarters[]>;
    protected readonly itemOffers$: Observable<ItemOffer[]>;
    protected readonly itemRequests$: Observable<ItemRequest[]>;
    protected readonly items$: Observable<Item[]>;

    private readonly userRole: UserRole = UserRole.CITIZEN;

    private map!: L.Map;
    private markersLayer!: L.LayerGroup;

    constructor(
        private store: Store<AppState>,
        private cookieService: CookieService
    ) {
        this.headquarters$ = this.store.select(headquartersSelector);
        this.itemOffers$ = this.store.select(itemOffersSelector);
        this.itemRequests$ = this.store.select(itemRequestsSelector);
        this.items$ = this.store.select(itemsSelector);

        this.userRole = this.cookieService.get('userRole') as UserRole;
    }

    //#region Lifecycle Hooks

    ngOnInit(): void {
        this.store.dispatch(HeadquartersActions.load());
        this.store.dispatch(ItemActions.load({ request: {} }));

        if (this.userRole === UserRole.CITIZEN) {
            this.store.dispatch(ItemOfferActions.loadMine({}));
            this.store.dispatch(ItemRequestActions.loadMine({}));
        } else {
            this.store.dispatch(ItemOfferActions.load({}));
            this.store.dispatch(ItemRequestActions.load({}));
        }
    }

    ngAfterViewInit(): void {
        this.initMap();
        this.zoomOnUser();
        this.placeHeadquartersOnMap();
        this.placeItemOfferOnMap();
        this.placeItemRequestOnMap();
    }

    ngOnDestroy(): void {
        this.map.remove();

        this.store.dispatch(HeadquartersActions.reset());
        this.store.dispatch(ItemOfferActions.reset());
        this.store.dispatch(ItemRequestActions.reset());
        this.store.dispatch(ItemActions.reset());

        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    //#endregion

    //#region Event Handlers

    //#endregion

    //#region Map

    private initMap() {
        this.map = L.map('map');

        L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }
        ).addTo(this.map);

        this.markersLayer = L.layerGroup().addTo(this.map);

        this.addMapClickEvent();
    }

    private zoomOnUser(): void {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            this.map.setView([latitude, longitude], 30);

            L.marker([latitude, longitude]).addTo(this.map).bindPopup('You are here!').openPopup();
        });
    }

    private placeHeadquartersOnMap(): void {
        this.headquarters$.pipe(takeUntil(this.unsubscribe$)).subscribe(headquarters => {
            headquarters.forEach(hq => {
                const marker = L.marker([hq.location.latitude, hq.location.longitude]);
                marker.bindPopup('Headquarters');
                marker.addTo(this.map);
            });
        });
    }

    private placeItemOfferOnMap(): void {
        this.itemOffers$.pipe(takeUntil(this.unsubscribe$)).subscribe(offers => {
            offers.forEach(offer => {
                const marker = L.marker([offer.citizen.location.latitude, offer.citizen.location.longitude])
                    .bindPopup(`<b>Offer: ${offer.item}</b><br>${offer.quantity}`);
                this.markersLayer.addLayer(marker);
            });
        });
    }

    private placeItemRequestOnMap(): void {
        this.itemRequests$.pipe(takeUntil(this.unsubscribe$)).subscribe(requests => {
            requests.forEach(request => {
                const marker = L.marker([request.citizen.location.latitude, request.citizen.location.longitude])
                    .bindPopup(`<b>Request: ${request.item}</b>`);
                this.markersLayer.addLayer(marker);
            });
        });
    }

    private addMapClickEvent() {
        this.map.on('click', (e: L.LeafletMouseEvent) => {
            const { lat, lng } = e.latlng;
            L.popup()
                .setLatLng(e.latlng)
                .setContent(`Coordinates: ${lat.toFixed(6)}, ${lng.toFixed(6)}`)
                .openOn(this.map);
        });
    }

    //#endregion
}

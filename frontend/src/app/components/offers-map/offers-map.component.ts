import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/app.reducer';
import {
    headquartersSelector,
    itemOffersSelector,
    itemRequestsSelector,
    itemsSelector,
    userSelector,
    usersSelector
} from '../../store/selectors/app.selector';
import { map, Observable, Subject, takeUntil } from 'rxjs';
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
import { itemOfferIcon, itemRequestIcon, locationPinIcon, truckIcon, warehouseIcon } from '../../constants/map-icons';
import { User } from '../../models/user.model';
import { UserActions } from '../../store/actions/user.actions';

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
    protected readonly rescuers$: Observable<User[]>;

    protected readonly userRole: UserRole = UserRole.CITIZEN;

    protected user: User | null = null;
    private map!: L.Map;

    private headquartersLayer = L.layerGroup();
    private itemOffersLayer = L.layerGroup();
    private itemRequestsLayer = L.layerGroup();
    private rescuersLayer = L.layerGroup();

    constructor(
        private store: Store<AppState>,
        private cookieService: CookieService
    ) {
        this.headquarters$ = this.store.select(headquartersSelector);
        this.itemOffers$ = this.store.select(itemOffersSelector);
        this.itemRequests$ = this.store.select(itemRequestsSelector);
        this.items$ = this.store.select(itemsSelector);
        this.rescuers$ = this.store.select(usersSelector).pipe(map(users => users.filter(user => user.role === UserRole.RESCUER)));

        this.userRole = this.cookieService.get('userRole') as UserRole;

        this.store.select(userSelector).pipe(takeUntil(this.unsubscribe$)).subscribe(user => this.user = user);
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

        if (this.userRole === UserRole.ADMIN) {
            this.store.dispatch(UserActions.load({ role: UserRole.RESCUER }));
        }
    }

    ngAfterViewInit(): void {
        this.initMap();
        this.placePinOnMapAndZoom();
        this.placeHeadquartersOnMap();
        this.placeItemOfferOnMap();
        this.placeItemRequestOnMap();
        this.placeRescuersOnMap();
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

        const overlayMaps: L.Control.LayersObject = {
            'Headquarters': this.headquartersLayer,
            'Item Offers': this.itemOffersLayer,
            'Item Requests': this.itemRequestsLayer,
            'Rescuers': this.rescuersLayer
        };

        L.control.layers({}, overlayMaps).addTo(this.map);

        this.addMapClickEvent();
    }

    private placePinOnMapAndZoom(): void {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            this.map.setView([latitude, longitude], 30);

            L.marker([latitude, longitude], { icon: locationPinIcon }).addTo(this.map).bindPopup('You are here!').openPopup();
        });
    }

    private placeHeadquartersOnMap(): void {
        this.headquartersLayer.addTo(this.map);

        this.headquarters$.pipe(takeUntil(this.unsubscribe$)).subscribe(headquarters => {
            headquarters.forEach(hq => {
                L.marker([hq.location.latitude, hq.location.longitude], { icon: warehouseIcon })
                    .bindPopup('Headquarters')
                    .addTo(this.headquartersLayer);
            });
        });
    }

    private placeItemOfferOnMap(): void {
        this.itemOffersLayer.addTo(this.map);

        this.itemOffers$.pipe(takeUntil(this.unsubscribe$)).subscribe(offers => {
            offers.forEach(offer => {
                L.marker([offer.citizen.location.latitude, offer.citizen.location.longitude], { icon: itemOfferIcon })
                    .bindPopup(`<b>Offer: ${offer.item.name}</b><b>Quantiry: ${offer.item.quantity}</b>`)
                    .addTo(this.itemOffersLayer);
            });
        });
    }

    private placeItemRequestOnMap(): void {
        this.itemRequestsLayer.addTo(this.map);

        this.itemRequests$.pipe(takeUntil(this.unsubscribe$)).subscribe(requests => {
            requests.forEach(request => {
                L.marker([request.citizen.location.latitude, request.citizen.location.longitude], { icon: itemRequestIcon })
                    .bindPopup(`<b>Request: ${request.item.name}</b>`)
                    .addTo(this.itemRequestsLayer);
            });
        });
    }

    private placeRescuersOnMap(): void {
        this.rescuersLayer.addTo(this.map);

        this.rescuers$.pipe(takeUntil(this.unsubscribe$)).subscribe(rescuers => {
            rescuers.forEach(rescuer => {
                L.marker([rescuer.location.latitude, rescuer.location.longitude], { icon: truckIcon })
                    .bindPopup(`<b>Rescuer: ${rescuer.username}</b>`)
                    .addTo(this.rescuersLayer);
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



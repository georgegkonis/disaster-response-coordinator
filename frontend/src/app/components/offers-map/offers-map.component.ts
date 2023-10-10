import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { CategoryActions, ComStoreActions } from '../../store/app.actions';
import { selectCategories, selectStores } from '../../store/app.selector';
import { Category, ComStore } from '../../models/app.model';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

type MapNode = {
    lon: number;
    lat: number;
    store: ComStore;
};

type DropdownCategory = {
    label: string;
    value: string | null;
};

@Component({
    selector: 'app-map',
    templateUrl: './offers-map.component.html',
    styleUrls: ['./offers-map.component.scss']
})
export class OffersMapComponent implements OnInit, AfterViewInit {
    searchForm: FormGroup;
    mapNodes: MapNode[] = [];
    dropdownCategories: DropdownCategory[] = [];

    private subscription: Subscription = new Subscription();
    private map: L.Map | null = null;

    constructor(
        private store: Store<AppState>,
        private formBuilder: FormBuilder
    ) {
        this.searchForm = this.formBuilder.group({
            name: [null],
            categoryId: [null]
        });
    }

    private storesSubscription = () => this.store.select(selectStores)
        .subscribe((stores) => {
            this.mapNodes = stores.map((store) => ({
                lon: store.lon,
                lat: store.lat,
                store
            }));

            // Check if the map is initialized before adding markers
            if (this.map) {
                this.removeStoreMarkers(this.map);
                this.addStoreMarkers(this.map, this.mapNodes);
            }
        });

    private categoriesSubscription = () => this.store.select(selectCategories)
        .subscribe((categories) => {
            this.dropdownCategories = categories.map((store: Category) => ({
                label: store.name,
                value: store.id
            }));

            this.dropdownCategories.push({ label: 'All', value: null })
        });

    ngOnInit(): void {
        this.store.dispatch(ComStoreActions.getAll({}));
        this.store.dispatch(CategoryActions.getAll());

        this.subscription.add(this.storesSubscription());
        this.subscription.add(this.categoriesSubscription());
    }

    ngAfterViewInit(): void {
        this.initializeMap();
    }

    onSubmit() {
        const { name, categoryId } = this.searchForm.value;

        this.store.dispatch(ComStoreActions.getAll({ name, categoryId }));
    }

    private initializeMap() {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            this.map = L.map('map').setView([latitude, longitude], 13);

            L.tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                { attribution: '© OpenStreetMap' }
            ).addTo(this.map);

            // Check if mapNodes are available, then add markers
            if (this.mapNodes.length > 0) {
                this.addStoreMarkers(this.map, this.mapNodes);
            }
        });
    }

    private addStoreMarkers(map: L.Map, nodes: MapNode[]) {
        nodes.forEach((node) => {
            const { lat, lon } = node;

            const marker = L.marker(
                [lat, lon],
                { icon: L.divIcon({ className: 'custom-marker', html: `<i class="pi pi-map-marker"></i>` }) }
            ).addTo(map);

            marker.bindPopup(node.store.type);

            marker.on('click', () => {
                // Handle marker click (e.g., show store details, navigate to a page)
            });
        });
    }

    private removeStoreMarkers(map: L.Map) {
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });
    }
}

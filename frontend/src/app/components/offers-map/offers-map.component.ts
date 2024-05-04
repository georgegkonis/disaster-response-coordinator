import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

type MapNode = {
    lon: number;
    lat: number;
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

    viewOfferVisible: boolean = false;
    addOfferVisible: boolean = false;

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

    // private storesSubscription = () => this.store.select(selectStores)
    //     .subscribe((stores) => {
    //         this.mapNodes = stores.map((store) => ({
    //             lon: store.lon,
    //             lat: store.lat,
    //             store
    //         }));
    //
    //         if (this.map) {
    //             this.setStoreMarkers(this.map, this.mapNodes);
    //         }
    //     });
    //
    // private categoriesSubscription = () => this.store.select(selectCategories)
    //     .subscribe((categories) => {
    //         this.dropdownCategories = categories.map((store: Category) => ({
    //             label: store.name,
    //             value: store.id
    //         }));
    //
    //         this.dropdownCategories.push({ label: 'All', value: null });
    //     });

    ngOnInit(): void {
        // this.store.dispatch(ComStoreActions.getAll({}));
        // this.store.dispatch(CategoryActions.getAll());
        //
        // this.subscription.add(this.storesSubscription());
        // this.subscription.add(this.categoriesSubscription());
    }

    ngAfterViewInit(): void {
        this.initializeMap();
    }

    onSubmit() {
        const { name, categoryId } = this.searchForm.value;

        // this.store.dispatch(ComStoreActions.getAll({ name, categoryId }));
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

            if (this.mapNodes.length > 0) this.setStoreMarkers(this.map, this.mapNodes);
        });
    }

    private setStoreMarkers(map: L.Map, nodes: MapNode[]) {
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker) map.removeLayer(layer);
        });
        nodes.forEach((node) => {
            const { lat, lon } = node;

            const marker = L.marker(
                [lat, lon],
                { icon: L.divIcon({ className: 'custom-marker', html: `<i class="pi pi-map-marker"></i>` }) }
            ).addTo(map);

            marker.on('click', () => {
                // this.comStore = node.store;
                this.viewOfferVisible = true;
            });
        });
    }

    onAddOfferClick(): void {
        this.addOfferVisible = true;
        this.viewOfferVisible = false;
    }
}

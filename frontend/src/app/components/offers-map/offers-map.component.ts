import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/app.reducer';

@Component({
    selector: 'app-map',
    templateUrl: './offers-map.component.html',
    styleUrls: ['./offers-map.component.scss']
})
export class OffersMapComponent implements AfterViewInit {

    private map!: L.Map;

    constructor(
        private store: Store<AppState>
    ) {}

    ngAfterViewInit(): void {
        this.map = L.map('map');

        L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }
        ).addTo(this.map);

        this.centerOnUser();
    }

    private centerOnUser() {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const marker = L.marker([latitude, longitude]).addTo(this.map);
            marker.bindPopup('You are here!');

            this.map.setView([latitude, longitude], 30);
        });
    }

    private setMarkers() {
        // Set user markers

        // Set headquarter markers


    }

}

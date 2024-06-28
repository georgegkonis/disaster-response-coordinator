import { Injectable } from '@angular/core';
import { MapLocation } from '../models/map-location.model';
import { AppState } from '../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { userSelector } from '../store/selectors/app.selector';
import { filter } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserActions } from '../store/actions/user.actions';

const INTERVAL_PERIOD = 1000 * 30; // 30 seconds

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    private updateLocationInterval: number | null = null;
    private lastLocation: MapLocation | null = null;

    constructor(
        private store: Store<AppState>
    ) {
        this.store.select(userSelector).pipe(
            filter(user => !!user),
            map(user => user?.location)
        ).subscribe(location => this.lastLocation = location!);
    }

    startLocationUpdates() {
        console.debug('Starting location updates...');
        this.updateLocationInterval = window.setInterval(() => this.getCurrentLocation().then((position) => {
            const location: MapLocation = { latitude: position.coords.latitude, longitude: position.coords.longitude };

            if (this.lastLocation?.latitude === location.latitude && this.lastLocation?.longitude === location.longitude) {
                console.debug('Location has not changed, skipping update...');
            } else {
                console.debug('Location has changed, updating...');
                this.store.dispatch(UserActions.updateLocation({ location }));
            }
        }), INTERVAL_PERIOD);
    }

    stopLocationUpdates() {
        console.debug('Stopping location updates...');
        if (this.updateLocationInterval === null) return;

        window.clearInterval(this.updateLocationInterval);
        this.updateLocationInterval = null;
    }

    private getCurrentLocation = (): Promise<GeolocationPosition> => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };
}

import { Component } from '@angular/core';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/app.actions';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

    constructor(
        private store: Store<AppState>
    ) {}

    onLogoutClick(): void {
        this.store.dispatch(AuthActions.logout());
    }
}

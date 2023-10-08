import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { AuthActions, UserActions } from '../../store/app.actions';
import { selectCurrentUser } from '../../store/app.selector';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    private subscription: Subscription = new Subscription();

    constructor(
        private store: Store<AppState>
    ) {}

    ngOnInit(): void {
        this.store.dispatch(UserActions.getCurrent());
        this.store.dispatch(UserActions.getAll());

        this.subscription.add(this.currentUserSubscription());
    }

    private currentUserSubscription = (): Subscription => this.store.select(selectCurrentUser)
        .subscribe((user: User | null) => {
            if (user) console.log(user);
        });

    onLogoutClick(): void {
        this.store.dispatch(AuthActions.logout());
    }
}

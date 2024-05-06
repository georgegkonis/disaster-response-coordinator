import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { UserActions } from '../../store/app.actions';
import { userSelector } from '../../store/app.selector';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { NavigationService } from '../../services/navigation.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    profileForm!: FormGroup;

    private subscription: Subscription = new Subscription();

    private currentUserSubscription = () => this.store.select(userSelector)
        .subscribe(user => {
            if (user) {
                this.profileForm.patchValue(user);
            }
        });

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private navigationService: NavigationService
    ) { }

    ngOnInit(): void {
        this.store.dispatch(UserActions.getCurrent());

        this.profileForm = this.formBuilder.group({
            username: [null],
            email: [{ value: '', disabled: true }],
            password: [null]
        });

        this.subscription.add(this.currentUserSubscription());
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSubmit(): void {
        if (this.profileForm.dirty) {
            const request: Partial<User> = {
                username: this.profileForm.value.username ?? undefined
                // password: this.profileForm.value.password ?? undefined
            };
            this.store.dispatch(UserActions.updateCurrent(request));
        }
        this.navigationService.navigateToDashboard();
    }

    onCancelClick(): void {
        this.navigationService.navigateToDashboard();
    }
}

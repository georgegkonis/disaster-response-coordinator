import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateUserRequest } from '../../models/requests.model';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { UserActions } from '../../store/app.actions';
import { Router } from '@angular/router';
import { selectCurrentUser } from '../../store/app.selector';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    profileForm!: FormGroup;

    private subscription: Subscription = new Subscription();

    private currentUserSubscription = () => this.store.select(selectCurrentUser)
        .subscribe(user => {
            if (user) {
                this.profileForm.patchValue(user);
            }
        });

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private router: Router
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
            const request: UpdateUserRequest = {
                username: this.profileForm.value.username ?? undefined,
                password: this.profileForm.value.password ?? undefined
            };
            this.store.dispatch(UserActions.updateCurrent(request));
        }
        this.router.navigate(['/dashboard']).then();
    }

    onCancelClick(): void {
        this.router.navigate(['/dashboard']).then();
    }


}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { UserActions } from '../../store/app.actions';
import { userSelector } from '../../store/app.selector';
import { Subscription } from 'rxjs';
import { NavigationService } from '../../services/navigation.service';
import { UpdateUserRequest } from '../../dto/requests/update-user-request.dto';

interface UserForm {
    username: FormControl<string>,
    email: FormControl<string>,
    password: FormControl<string>,
    details: FormGroup<UserDetailsForm>
}

interface UserDetailsForm {
    firstName: FormControl<string>,
    lastName: FormControl<string>,
    phoneNumber: FormControl<string>
}

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

    private readonly subscriptions: Subscription[] = [];

    protected readonly userForm: FormGroup<UserForm> = new FormGroup<UserForm>({
        username: new FormControl<string>('', { nonNullable: true }),
        email: new FormControl<string>('', { nonNullable: true }),
        password: new FormControl<string>('', { nonNullable: true }),
        details: new FormGroup<UserDetailsForm>({
            firstName: new FormControl<string>('', { nonNullable: true }),
            lastName: new FormControl<string>('', { nonNullable: true }),
            phoneNumber: new FormControl<string>('', { nonNullable: true })
        })
    });

    private userSubscription = () => this.store.select(userSelector)
        .subscribe(user => {
            if (!user) return;
            this.userForm.patchValue(user);
        });

    constructor(
        private store: Store<AppState>,
        private navigationService: NavigationService
    ) {}

    ngOnInit(): void {
        this.subscriptions.push(this.userSubscription());

        this.store.dispatch(UserActions.getMe());
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    onSubmit(): void {
        if (this.userForm.dirty) {
            const request: UpdateUserRequest = {
                username: this.userForm.controls.username.dirty ? this.userForm.controls.username.value : undefined,
                password: this.userForm.controls.password.dirty ? this.userForm.controls.password.value : undefined,
                details: this.userForm.controls.details.getRawValue()
            };
            this.store.dispatch(UserActions.updateMe({ request }));
        }
    }

    onCancelClick(): void {
        this.userForm.reset();
        this.navigationService.navigateToDashboard();
    }
}

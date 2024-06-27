import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UpdateUserRequest } from '../../dto/requests/update-user-request.dto';
import { AppState } from '../../store/reducers/app.reducer';
import { userSelector } from '../../store/selectors/app.selector';
import { UserActions } from '../../store/actions/user.actions';
import { User } from '../../models/user.model';

interface UserForm {
    username: FormControl<string>,
    email: FormControl<string>,
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

    private readonly destroy$: Subject<void> = new Subject<void>();
    private readonly user$: Observable<User | null>;

    protected readonly userForm: FormGroup<UserForm> = initUserForm();

    //#region Constructor

    constructor(
        private store: Store<AppState>
    ) {
        this.user$ = this.store.select(userSelector);
    }

    //#endregion

    //#region Lifecycle Hooks

    ngOnInit(): void {
        this.user$.pipe(takeUntil(this.destroy$)).subscribe(user => {
            if (!user) return;
            this.userForm.patchValue(user);
        });

        this.store.dispatch(UserActions.loadMe());
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    //#endregion

    //#region Event Handlers

    onSubmit(): void {
        const request: UpdateUserRequest = this.userForm.getRawValue();
        this.store.dispatch(UserActions.updateMe({ request }));
    }

    //#endregion
}

const initUserForm = (): FormGroup<UserForm> => new FormGroup<UserForm>({
    username: new FormControl<string>({ value: '', disabled: true }, { nonNullable: true }),
    email: new FormControl<string>({ value: '', disabled: true }, { nonNullable: true }),
    details: initUserDetailsForm()
});

const initUserDetailsForm = (): FormGroup<UserDetailsForm> => new FormGroup<UserDetailsForm>({
    firstName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    phoneNumber: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
});

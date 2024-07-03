import { Component, OnInit } from '@angular/core';
import { ConfirmationService, SelectItem, TooltipOptions } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRole } from '../../enums/user-role.enum';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { AppState } from '../../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { tooltipOptions } from '../../constants/tooltip-options';
import { UserActions } from '../../store/actions/user.actions';
import { usersSelector } from '../../store/selectors/app.selector';
import { CreateUserRequest } from '../../dto/requests/create-user-request.dto';

interface UserForm {
    username: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    role: FormControl<UserRole>;
}

interface UserDetailsForm {
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    phoneNumber: FormControl<string>;
}

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

    //#region Properties

    protected readonly tooltipOptions: TooltipOptions = tooltipOptions;
    protected readonly userForm: FormGroup<UserForm> = initUserForm();
    protected readonly users$: Observable<User[]>;
    protected readonly rolesSelection: SelectItem<UserRole>[];

    protected createUserDialogVisible: boolean = false;
    protected selectedUsers: User[] = [];

    //#endregion

    //#region Constructor

    constructor(
        private readonly store: Store<AppState>,
        private readonly confirmationService: ConfirmationService
    ) {
        this.users$ = this.store.select(usersSelector);

        this.rolesSelection = [
            { label: 'Citizen', value: UserRole.CITIZEN },
            { label: 'Rescuer', value: UserRole.RESCUER }
        ];
    }

    //#endregion

    //#region Lifecycle Hooks

    ngOnInit(): void {
        this.store.dispatch(UserActions.load({}));
    }

    //#endregion

    //#region Event Handlers

    onCreateClick(): void {
        this.createUserDialogVisible = true;
    }

    onDeleteClick(userId: string): void {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this user?',
            accept: () => this.store.dispatch(UserActions.$delete({ id: userId }))
        });
    }

    onSubmit(): void {
        const request: CreateUserRequest = this.userForm.getRawValue();
        this.store.dispatch(UserActions.create({ request }));
        this.createUserDialogVisible = false;
        this.userForm.reset();
    }

    onCancelClick(): void {
        this.createUserDialogVisible = false;
        this.userForm.reset();
    }

    onReloadClick(): void {
        this.store.dispatch(UserActions.load({}));
    }

    //#endregion
}

const initUserForm = () => new FormGroup<UserForm>({
    username: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    role: new FormControl<UserRole>(UserRole.CITIZEN, { nonNullable: true, validators: [Validators.required] })
});

const initUserDetailsForm = () => new FormGroup<UserDetailsForm>({
    firstName: new FormControl<string>({ value: '', disabled: false }, { nonNullable: true }),
    lastName: new FormControl<string>({ value: '', disabled: false }, { nonNullable: true }),
    phoneNumber: new FormControl<string>({ value: '', disabled: false }, { nonNullable: true })
});

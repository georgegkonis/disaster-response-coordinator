import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RegisterRequest } from '../../dto/requests/register-request.dto';
import { NavigationService } from '../../services/navigation.service';
import { AppState } from '../../store/reducers/app.reducer';
import { AuthActions } from '../../store/actions/auth.actions';

interface RegisterForm {
    username: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    passwordConfirm: FormControl<string>;
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    protected readonly registerForm: FormGroup<RegisterForm> = new FormGroup<RegisterForm>({
        username: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        passwordConfirm: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
    });

    constructor(
        private store: Store<AppState>,
        private navigationService: NavigationService
    ) {}

    onSubmit(): void {
        if (this.registerForm.valid) {
            const request: RegisterRequest = this.registerForm.getRawValue();
            this.store.dispatch(AuthActions.register({ request }));
        }
    }

    onCancelClick(): void {
        this.registerForm.reset();
        this.navigationService.navigateToHome();
    }
}

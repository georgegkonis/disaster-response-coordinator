import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/app.actions';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../dto/requests/register-request.dto';

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

    registerForm: FormGroup<RegisterForm> = new FormGroup<RegisterForm>({
        username: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        passwordConfirm: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
    });

    constructor(
        private store: Store<AppState>,
        private router: Router
    ) {}

    onSubmit(): void {
        if (this.registerForm.valid) {
            const request: RegisterRequest = this.registerForm.getRawValue();
            this.store.dispatch(AuthActions.register(request));
        }
    }

    onCancelClick(): void {
        this.router.navigate(['/']).then();
    }
}

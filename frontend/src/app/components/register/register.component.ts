import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterRequest } from '../../models/requests.model';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/app.actions';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private store: Store<AppState>
    ) { }

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            passwordConfirmation: ['', [Validators.required]]
        });
    }

    onRegisterClick(): void {
        if (this.registerForm.valid) {
            const request: RegisterRequest = this.registerForm.value;
            this.store.dispatch(AuthActions.register(request))
        }
    }
}

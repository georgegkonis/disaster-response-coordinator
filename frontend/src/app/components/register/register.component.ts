import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/app.actions';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../dto/requests/register-request.dto';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            passwordConfirm: ['', [Validators.required]]
        });
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            const request: RegisterRequest = this.registerForm.value;
            this.store.dispatch(AuthActions.register(request));
        }
    }

    onCancelClick(): void {
        this.router.navigate(['/']).then();
    }
}

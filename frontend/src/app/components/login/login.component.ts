import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../../models/login.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    formData!: LoginModel;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    onLoginClick(): void {
        if (this.loginForm.valid) {
            this.formData = this.loginForm.value; // Populate formData with the form values
            // Handle registration logic here
        }
    }
}

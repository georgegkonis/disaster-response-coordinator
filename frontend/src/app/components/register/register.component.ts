import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from '../../models/register.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    formData!: RegisterModel;

    constructor(private fb: FormBuilder) { }

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
            this.formData = this.registerForm.value; // Populate formData with the form values
            // Handle registration logic here
        }
    }
}

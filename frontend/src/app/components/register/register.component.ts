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
            username: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            passwordConfirmation: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            this.formData = this.registerForm.value; // Populate formData with the form values
            // Handle registration logic here
        }
    }
}

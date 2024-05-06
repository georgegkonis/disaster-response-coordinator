import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { RoutesPaths } from '../constants/routes-paths';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(
        private router: Router
    ) {}

    navigateToHome(): void {
        this.router.navigate([RoutesPaths.HOME])
            .then(() => console.debug('Navigated to home'));
    }

    navigateToLogin(): void {
        this.router.navigate([RoutesPaths.LOGIN])
            .then(() => console.debug('Navigated to login'));
    }

    navigateToRegister(): void {
        this.router.navigate([RoutesPaths.REGISTER])
            .then(() => console.debug('Navigated to register'));
    }

    navigateToDashboard(): void {
        this.router.navigate([RoutesPaths.DASHBOARD])
            .then(() => console.debug('Navigated to dashboard'));
    }
}
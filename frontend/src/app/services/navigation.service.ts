import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { routesPaths } from '../constants/routes-paths';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    navigateBack(): void {
        this.router.navigate(['..'], { skipLocationChange: true, relativeTo: this.activatedRoute })
            .then(() => console.debug('Navigated back'));
    }

    navigateToHome(): void {
        this.router.navigate([routesPaths.HOME])
            .then(() => console.debug('Navigated to home'));
    }

    navigateToLogin(): void {
        this.router.navigate([routesPaths.LOGIN])
            .then(() => console.debug('Navigated to login'));
    }

    navigateToRegister(): void {
        this.router.navigate([routesPaths.REGISTER])
            .then(() => console.debug('Navigated to register'));
    }

    navigateToDashboard(): void {
        this.router.navigate([routesPaths.DASHBOARD])
            .then(() => console.debug('Navigated to dashboard'));
    }

    navigateToMap(): void {
        this.router.navigate([routesPaths.MAP])
            .then(() => console.debug('Navigated to map'));
    }
}
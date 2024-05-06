import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NavigationService } from '../services/navigation.service';
import { MessageService } from 'primeng/api';

export const authGuard: CanActivateFn = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
    const cookieService = inject(CookieService);
    const messageService = inject(MessageService);
    const navigationService = inject(NavigationService);

    if (cookieService.check('loggedIn')) return true;

    messageService.add({ severity: 'error', summary: 'Unauthorized Action', detail: 'You must be logged in to access this page' });
    navigationService.navigateToLogin();

    return false;
};

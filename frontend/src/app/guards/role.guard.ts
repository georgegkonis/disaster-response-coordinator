import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { UserRole } from '../enums/user-role.enum';
import { NavigationService } from '../services/navigation.service';

const createRoleGuard = (role: UserRole): CanActivateFn => (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
    const cookieService = inject(CookieService);
    const messageService = inject(MessageService);
    const navigationService = inject(NavigationService);

    if (cookieService.get('userRole') === role) return true;

    messageService.add({ severity: 'error', summary: 'Forbidden Action', detail: `You do not have permission to access this page` });
    navigationService.navigateBack();

    return false;
};

export const adminRoleGuard = createRoleGuard(UserRole.ADMIN);

export const rescuerRoleGuard = createRoleGuard(UserRole.RESCUER);

export const citizenRoleGuard = createRoleGuard(UserRole.CITIZEN);
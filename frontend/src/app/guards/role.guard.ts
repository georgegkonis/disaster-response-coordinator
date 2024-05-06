import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { UserRole } from '../enums/user-role.enum';

const createRoleGuard = (role: UserRole): CanActivateFn => (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
    const cookieService = inject(CookieService);
    const messageService = inject(MessageService);

    if (cookieService.get('userRole') === role) return true;

    messageService.add({ severity: 'error', summary: 'Forbidden Action', detail: `You do not have permission to access this page` });

    return false;
};

export const adminRoleGuard = createRoleGuard(UserRole.ADMIN);

export const rescuerRoleGuard = createRoleGuard(UserRole.RESCUER);

export const citizenRoleGuard = createRoleGuard(UserRole.CITIZEN);
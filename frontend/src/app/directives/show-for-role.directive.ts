import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserRole } from '../enums/user-role.enum';

@Directive({
    standalone: true,
    selector: '[appShowForRole]'
})
export class ShowForRoleDirective {

    private readonly userRole: UserRole;

    constructor(
        private readonly templateRef: TemplateRef<any>,
        private readonly viewContainer: ViewContainerRef,
        cookieService: CookieService
    ) {
        this.userRole = cookieService.get('userRole') as UserRole;
    }

    @Input() set appShowForRole(roles: UserRole[]) {
        this.updateView(roles);
    }

    private updateView(roles: UserRole[]) {
        this.viewContainer.clear();
        if (roles.includes(this.userRole)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { UserRole } from '../../enums/user-role.enum';
import { CookieService } from 'ngx-cookie-service';
import { routesPaths } from '../../constants/routes-paths';
import { AppState } from '../../store/reducers/app.reducer';
import { AuthActions } from '../../store/actions/auth.actions';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    private readonly isAdmin: boolean;

    protected menuItems!: MenuItem[];

    constructor(
        private store: Store<AppState>,
        cookieService: CookieService
    ) {
        this.isAdmin = cookieService.get('userRole') === UserRole.ADMIN;
    }

    ngOnInit(): void {
        this.menuItems = [
            {
                label: 'Map',
                icon: 'pi pi-fw pi-map-marker',
                routerLink: routesPaths.MAP
            },
            {
                label: 'Warehouse',
                icon: 'pi pi-fw pi-home',
                routerLink: routesPaths.WAREHOUSE,
                visible: this.isAdmin,
            },
            {
                label: 'Announcements',
                icon: 'pi pi-fw pi-bell',
                routerLink: routesPaths.ANNOUNCEMENTS
            },
            {
                label: 'Analytics',
                icon: 'pi pi-fw pi-chart-bar',
                routerLink: routesPaths.ANALYTICS,
                visible: this.isAdmin,
                disabled: true
            },
            {
                label: 'Users',
                icon: 'pi pi-fw pi-users',
                routerLink: routesPaths.USERS,
                visible: this.isAdmin
            },
            {
                label: 'Account',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Details',
                        icon: 'pi pi-fw pi-user-edit',
                        routerLink: routesPaths.PROFILE
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-fw pi-sign-out',
                        command: () => this.store.dispatch(AuthActions.logout())
                    }
                ]
            }
        ];
    }
}

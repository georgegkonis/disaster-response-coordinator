import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { AuthActions } from '../../store/app.actions';
import { UserRole } from '../../enums/user-role.enum';
import { CookieService } from 'ngx-cookie-service';
import { routesPaths } from '../../constants/routes-paths';
import { NavigationService } from '../../services/navigation.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    private isAdmin: boolean = false;

    protected menuItems!: MenuItem[];

    protected profileMenuItem: MenuItem = {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        items: [
            {
                label: 'Details',
                icon: 'pi pi-fw pi-lock',
                routerLink: routesPaths.PROFILE
            },
            {
                label: 'Logout',
                icon: 'pi pi-fw pi-sign-out',
                command: () => this.store.dispatch(AuthActions.logout())
            }
        ],
        styleClass: 'menu-right'
    };

    constructor(
        private store: Store<AppState>,
        private cookieService: CookieService,
        private navigationService: NavigationService
    ) {}

    ngOnInit(): void {
        this.isAdmin = this.cookieService.get('userRole') === UserRole.ADMIN;

        this.menuItems = [
            {
                label: 'Map',
                icon: 'pi pi-fw pi-map-marker',
                routerLink: routesPaths.MAP
            },
            {
                label: 'Announcements',
                icon: 'pi pi-fw pi-bell',
                routerLink: routesPaths.ANNOUNCEMENTS
            },
            {
                label: 'Warehouse',
                icon: 'pi pi-fw pi-home',
                visible: this.isAdmin,
                routerLink: routesPaths.WAREHOUSE
            },
            {
                label: 'Analytics',
                icon: 'pi pi-fw pi-chart-bar',
                visible: this.isAdmin,
                routerLink: routesPaths.ANALYTICS
            },
            {
                label: 'Users',
                icon: 'pi pi-fw pi-users',
                visible: this.isAdmin,
                routerLink: routesPaths.USERS
            },
            this.profileMenuItem
        ];

        this.navigationService.navigateToMap();
    }
}

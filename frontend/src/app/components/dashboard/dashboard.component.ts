import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { AuthActions } from '../../store/app.actions';
import { UserRole } from '../../enums/user-role.enum';
import { CookieService } from 'ngx-cookie-service';
import { routesPaths } from '../../constants/routes-paths';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    protected menuItems!: MenuItem[];
    private isAdmin: boolean = false;

    constructor(
        private store: Store<AppState>,
        private cookieService: CookieService
    ) {}

    ngOnInit(): void {
        this.isAdmin = this.cookieService.get('userRole') === UserRole.ADMIN;

        this.menuItems = [
            {
                label: 'Product Offers',
                icon: 'pi pi-fw pi-map-marker',
                routerLink: routesPaths.MAP
            },
            {
                label: 'Management',
                icon: 'pi pi-fw pi-wrench',
                visible: this.isAdmin,
                routerLink: routesPaths.MANAGEMENT
            },
            {
                label: 'Statistics',
                icon: 'pi pi-fw pi-chart-bar',
                visible: this.isAdmin,
                routerLink: routesPaths.STATISTICS
            },
            {
                label: 'Leaderboard',
                icon: 'pi pi-fw pi-users',
                routerLink: routesPaths.LEADERBOARD
            },
            {
                label: 'Profile',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Security',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: routesPaths.PROFILE
                    },
                    {
                        label: 'Statistics',
                        icon: 'pi pi-fw pi-chart-bar',
                        routerLink: routesPaths.PROFILE_STATISTICS
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

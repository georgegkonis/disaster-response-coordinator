import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { UserRole } from '../../enums/user-role.enum';
import { CookieService } from 'ngx-cookie-service';
import { routesPaths } from '../../constants/routes-paths';
import { AppState } from '../../store/reducers/app.reducer';
import { AuthActions } from '../../store/actions/auth.actions';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { userSelector } from '../../store/selectors/app.selector';
import { UserActions } from '../../store/actions/user.actions';
import { LocationService } from '../../services/location.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    protected readonly routesPaths = routesPaths;
    protected readonly user$: Observable<User | null>;

    protected menuItems: MenuItem[];

    constructor(
        private store: Store<AppState>,
        private confirmationService: ConfirmationService,
        private locationService: LocationService,
        cookieService: CookieService
    ) {
        this.user$ = this.store.select(userSelector);

        const isAdmin: boolean = cookieService.get('userRole') === UserRole.ADMIN;

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
                visible: isAdmin,
                items: [
                    {
                        label: 'Categories',
                        icon: 'pi pi-fw pi-tags',
                        disabled: true // TODO: enable when categories are implemented
                    }
                ]
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
                visible: isAdmin
            },
            {
                label: 'Users',
                icon: 'pi pi-fw pi-users',
                routerLink: routesPaths.USERS,
                visible: isAdmin
            }
        ];
    }

    //#region Lifecycle Hooks

    ngOnInit(): void {
        this.store.dispatch(UserActions.loadMe());
        this.locationService.startLocationUpdates();
    }

    ngOnDestroy(): void {
        this.store.dispatch(UserActions.reset());
        this.locationService.stopLocationUpdates();
    }

    //#endregion

    //#region Event Handlers

    onLogoutClick(): void {
        this.confirmationService.confirm({
            message: 'Are you sure you want to log out?',
            accept: () => this.store.dispatch(AuthActions.logout())
        });
    }

    //#endregion
}


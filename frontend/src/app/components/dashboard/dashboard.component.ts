import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { AuthActions } from '../../store/app.actions';
import { roleSelector } from '../../store/app.selector';
import { UserRole } from '../../enums/user-role.enum';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    menuItems: MenuItem[] = [];

    private isAdmin: boolean = false;

    private subscription: Subscription = new Subscription();

    private currentRoleSubscription = () => this.store.select(roleSelector)
        .subscribe((role: UserRole | null) => this.isAdmin = role === UserRole.ADMIN);

    constructor(
        private store: Store<AppState>
    ) {}

    ngOnInit(): void {
        this.subscription.add(this.currentRoleSubscription());

        this.menuItems = [
            {
                label: 'Product Offers',
                icon: 'pi pi-fw pi-map-marker',
                routerLink: '/dashboard/map'
            },
            {
                label: 'Management',
                icon: 'pi pi-fw pi-wrench',
                visible: this.isAdmin,
                routerLink: '/dashboard/management'
            },
            {
                label: 'Statistics',
                icon: 'pi pi-fw pi-chart-bar',
                visible: this.isAdmin,
                routerLink: '/dashboard/statistics'
            },
            {
                label: 'Leaderboard',
                icon: 'pi pi-fw pi-users',
                routerLink: '/dashboard/leaderboard'
            },
            {
                label: 'Profile',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Security',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: '/dashboard/profile'
                    },
                    {
                        label: 'Statistics',
                        icon: 'pi pi-fw pi-chart-bar',
                        routerLink: '/dashboard/profile/statistics'
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

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

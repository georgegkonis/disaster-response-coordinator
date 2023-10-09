import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { AuthActions } from '../../store/app.actions';
import { selectCurrentRole } from '../../store/app.selector';
import { Role } from '../../enums/user-role.enum';
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

    private currentRoleSubscription = () => this.store.select(selectCurrentRole)
        .subscribe((role: Role | null) => this.isAdmin = role === Role.Admin);

    constructor(
        private store: Store<AppState>
    ) {}

    ngOnInit(): void {
        this.subscription.add(this.currentRoleSubscription());

        this.menuItems = [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                routerLink: '/dashboard'
            },
            {
                label: 'Products',
                icon: 'pi pi-fw pi-shopping-cart',
                visible: this.isAdmin
            },
            {
                label: 'Stores',
                icon: 'pi pi-fw pi-home',
                visible: this.isAdmin
            },
            {
                label: 'My Account',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Profile',
                        icon: 'pi pi-fw pi-user-edit',
                        routerLink: '/dashboard/profile'
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

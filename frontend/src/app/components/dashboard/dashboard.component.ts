import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { AuthActions } from '../../store/app.actions';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    menuItems: MenuItem[] = [];

    constructor(
        private store: Store<AppState>
    ) {}

    ngOnInit(): void {
        this.menuItems = [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                routerLink: '/dashboard'
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

}

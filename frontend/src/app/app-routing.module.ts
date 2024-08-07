import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { adminRoleGuard } from './guards/role.guard';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { OffersMapComponent } from './components/offers-map/offers-map.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { UsersComponent } from './components/users/users.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'map',
                component: OffersMapComponent
            },
            {
                path: 'announcements',
                component: AnnouncementsComponent
            },
            {
                path: 'users',
                component: UsersComponent,
                canActivate: [adminRoleGuard]
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'warehouse',
                component: WarehouseComponent,
                canActivate: [adminRoleGuard]
            },
            {
                path: 'analytics',
                component: AnalyticsComponent,
                canActivate: [adminRoleGuard]
            }
        ]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: '404'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}


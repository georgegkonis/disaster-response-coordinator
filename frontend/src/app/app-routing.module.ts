import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { roleGuard } from './guards/role.guard';
import { UserRole } from './enums/user-role.enum';
import { ManagementComponent } from './components/management/management.component';
import { OffersMapComponent } from './components/offers-map/offers-map.component';

const ROUTES: Routes = [
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
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'management',
                component: ManagementComponent,
                canActivate: [roleGuard],
                data: { role: UserRole.ADMIN }
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
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {}


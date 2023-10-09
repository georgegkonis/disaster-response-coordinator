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
import { Role } from './enums/user-role.enum';

const routes: Routes = [
    {
        path: '',
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
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'products',
                component: NotFoundComponent,
                canActivate: [roleGuard],
                data: { role: Role.Admin }
            },
            {
                path: 'stores',
                component: NotFoundComponent,
                canActivate: [roleGuard],
                data: { role: Role.Admin }
            },
            {
                path: 'statistics',
                component: NotFoundComponent,
                canActivate: [roleGuard],
                data: { role: Role.Admin }
            },
        ]
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


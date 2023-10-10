import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppShellComponent } from './components/app-shell/app-shell.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/app.effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpCredentialsInterceptor } from './interceptors/http-credentials.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenubarModule } from 'primeng/menubar';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ManagementComponent } from './components/management/management.component';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MapComponent } from './components/map/map.component';

@NgModule({
    declarations: [
        AppShellComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        DashboardComponent,
        NotFoundComponent,
        ManagementComponent,
        MapComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        InputTextModule,
        ButtonModule,
        PasswordModule,
        ReactiveFormsModule,
        StoreModule.forRoot({ app: appReducer }),
        EffectsModule.forRoot(AppEffects),
        StoreDevtoolsModule.instrument(),
        HttpClientModule,
        BrowserAnimationsModule,
        ToastModule,
        MenubarModule,
        DropdownModule,
        FileUploadModule,
        FormsModule,
        ConfirmDialogModule
    ],
    providers: [
        MessageService,
        ConfirmationService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true, deps: [MessageService] },
        { provide: HTTP_INTERCEPTORS, useClass: HttpCredentialsInterceptor, multi: true }
    ],
    bootstrap: [AppShellComponent]
})
export class AppModule {}

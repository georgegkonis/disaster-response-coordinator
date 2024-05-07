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
import { WarehouseComponent } from './components/management/warehouse.component';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OffersMapComponent } from './components/offers-map/offers-map.component';
import { DialogModule } from 'primeng/dialog';
import { CookieService } from 'ngx-cookie-service';
import { MenuModule } from 'primeng/menu';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { PanelModule } from 'primeng/panel';
import { MessageModule } from 'primeng/message';
import { RippleModule } from 'primeng/ripple';

@NgModule({
    declarations: [
        AppShellComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        DashboardComponent,
        NotFoundComponent,
        WarehouseComponent,
        OffersMapComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        InputTextModule,
        ButtonModule,
        PasswordModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastModule,
        MenubarModule,
        DropdownModule,
        FileUploadModule,
        FormsModule,
        ConfirmDialogModule,
        DialogModule,
        StoreDevtoolsModule.instrument(),
        StoreModule.forRoot({ app: appReducer }),
        EffectsModule.forRoot(AppEffects),
        MenuModule,
        DataViewModule,
        TagModule,
        PanelModule,
        MessageModule,
        RippleModule
    ],
    providers: [
        MessageService,
        ConfirmationService,
        CookieService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true, deps: [MessageService] },
        { provide: HTTP_INTERCEPTORS, useClass: HttpCredentialsInterceptor, multi: true }
    ],
    bootstrap: [AppShellComponent]
})
export class AppModule {}

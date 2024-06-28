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
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
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
import { WarehouseComponent } from './components/warehouse/warehouse.component';
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
import { appReducer } from './store/reducers/app.reducer';
import { AuthEffects } from './store/effects/auth.effects';
import { UserEffects } from './store/effects/user.effects';
import { WarehouseEffects } from './store/effects/warehouse.effects';
import { MultiSelectModule } from 'primeng/multiselect';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { TableModule } from 'primeng/table';
import { AnnouncementsEffects } from './store/effects/announcements.effects';
import { ToolbarModule } from 'primeng/toolbar';
import { StyleClassModule } from 'primeng/styleclass';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InputNumberModule } from 'primeng/inputnumber';
import { ItemNamesPipe } from './pipes/item-names.pipe';
import { BadgeModule } from 'primeng/badge';
import { QuantityStatusPipe } from './pipes/quantity-status.pipe';
import { TabViewModule } from 'primeng/tabview';
import { FieldsetModule } from 'primeng/fieldset';
import { ItemEffects } from './store/effects/item.effects';
import { CategoryEffects } from './store/effects/category.effects';
import { UsersComponent } from './components/users/users.component';
import { HeadquartersEffects } from './store/effects/headquarters.effects';
import { ItemOfferEffects } from './store/effects/item-offer.effects';
import { ItemRequestEffects } from './store/effects/item-request.effects';

@NgModule({
    bootstrap: [AppShellComponent],
    declarations: [
        AppShellComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        DashboardComponent,
        NotFoundComponent,
        WarehouseComponent,
        OffersMapComponent,
        AnnouncementsComponent,
        UsersComponent
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
        EffectsModule.forRoot([
            AuthEffects,
            UserEffects,
            WarehouseEffects,
            AnnouncementsEffects,
            ItemEffects,
            CategoryEffects,
            HeadquartersEffects,
            ItemOfferEffects,
            ItemRequestEffects
        ]),
        MenuModule,
        DataViewModule,
        TagModule,
        PanelModule,
        MessageModule,
        RippleModule,
        MultiSelectModule,
        TableModule,
        ToolbarModule,
        StyleClassModule,
        NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
        InputNumberModule,
        ItemNamesPipe,
        BadgeModule,
        QuantityStatusPipe,
        TabViewModule,
        FieldsetModule
    ],
    providers: [
        MessageService,
        ConfirmationService,
        CookieService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true, deps: [MessageService] },
        { provide: HTTP_INTERCEPTORS, useClass: HttpCredentialsInterceptor, multi: true }
    ]
})
export class AppModule {}

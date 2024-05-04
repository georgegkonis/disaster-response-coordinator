import { InjectionToken } from '@angular/core';

export const APP_SETTINGS: InjectionToken<AppSettings> = new InjectionToken<AppSettings>('App Settings');

export interface AppSettings {
    apiUrl: string;
    apiKey: string;
}
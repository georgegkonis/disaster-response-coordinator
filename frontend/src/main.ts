import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { APP_SETTINGS, AppSettings } from './app/settings/settings';

fetch('assets/settings.json')
    .then(response => response.json())
    .then(startAppWithSettings);

function startAppWithSettings(settings: AppSettings) {
    console.debug('Loaded app settings: ', settings);
    platformBrowserDynamic([{ provide: APP_SETTINGS, useValue: settings }])
        .bootstrapModule(AppModule)
        .catch(err => console.error(err));
}
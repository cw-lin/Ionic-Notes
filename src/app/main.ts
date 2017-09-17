import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

declare var cordova: any;
declare var window: any;

platformBrowserDynamic().bootstrapModule(AppModule);

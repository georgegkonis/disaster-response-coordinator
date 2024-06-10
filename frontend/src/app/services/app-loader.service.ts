import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
    providedIn: 'root'
})
export class AppLoaderService {

    private requestCount = 0;

    constructor(
        private spinnerService: NgxSpinnerService
    ) {}

    show() {
        this.requestCount++;
        if (this.requestCount === 1) {
            this.spinnerService.show().then(() => console.debug('loader displayed'));
        }
    }

    hide() {
        if (this.requestCount > 0) {
            this.requestCount--;
        }
        if (this.requestCount === 0) {
            this.spinnerService.hide().then(() => console.debug('loader hidden'));
        }
    }
}
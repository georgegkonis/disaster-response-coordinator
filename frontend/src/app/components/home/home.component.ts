import { Component } from '@angular/core';
import { RoutesPaths } from '../../constants/routes-paths';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    protected readonly RoutesPaths = RoutesPaths;

    constructor() {}
}

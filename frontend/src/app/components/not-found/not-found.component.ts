import { Component } from '@angular/core';
import { routesPaths } from '../../constants/routes-paths';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

    protected readonly routesPaths = routesPaths;
}

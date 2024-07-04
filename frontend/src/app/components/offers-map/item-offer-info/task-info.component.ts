import { Component, Input } from '@angular/core';
import { ItemOffer } from '../../../models/item-offer.model';
import { ItemRequest } from '../../../models/item-request.model';

@Component({
    selector: 'app-task-info',
    templateUrl: './task-info.component.html',
    styleUrl: './task-info.component.scss'
})
export class TaskInfoComponent {

    @Input() task!: ItemOffer | ItemRequest;
}

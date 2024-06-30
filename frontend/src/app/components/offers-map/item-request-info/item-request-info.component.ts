import { Component, Input } from '@angular/core';
import { ItemRequest } from '../../../models/item-request.model';

@Component({
    selector: 'app-item-request-info',
    templateUrl: './item-request-info.component.html',
    styleUrl: './item-request-info.component.scss'
})
export class ItemRequestInfoComponent {

    @Input() itemRequest!: ItemRequest;
}

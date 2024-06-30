import { Component, Input } from '@angular/core';
import { ItemOffer } from '../../../models/item-offer.model';

@Component({
    selector: 'app-item-offer-info',
    templateUrl: './item-offer-info.component.html',
    styleUrl: './item-offer-info.component.scss'
})
export class ItemOfferInfoComponent {

    @Input() itemOffer!: ItemOffer;
}

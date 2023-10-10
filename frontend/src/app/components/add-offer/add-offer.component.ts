import { Component, Input, OnInit } from '@angular/core';
import { ComStore } from '../../models/app.model';
import { OfferService } from '../../services/offer.service';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-add-offer',
    templateUrl: './add-offer.component.html',
    styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent implements OnInit {

    dropdownCategories: any[] = [];

    @Input() comStore!: ComStore;

    constructor(
        private offerService: OfferService,
        private categoryService: CategoryService
    ) { }

    ngOnInit(): void {
        this.categoryService.getAllWithProducts().subscribe(
            (categories) => {
                this.dropdownCategories = categories;
            }
        );
    }
}

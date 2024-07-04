import { Component, Input } from '@angular/core';
import { Item } from '../../../models/item.model';
import { User } from '../../../models/user.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

interface ItemQuantityForm {
    itemId: FormControl<string>;
    quantity: FormControl<number>;
}

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrl: './inventory.component.scss'
})
export class InventoryComponent {

    @Input() items!: Item[];
    @Input() user!: User | null;

    protected readonly form: FormArray<FormGroup<ItemQuantityForm>> = new FormArray<FormGroup<ItemQuantityForm>>([]);
}

const initInventoryItemForm = () => new FormGroup<ItemQuantityForm>({
    itemId: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    quantity: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] })
});
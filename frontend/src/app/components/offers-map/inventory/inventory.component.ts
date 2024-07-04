import { Component, Input, OnChanges } from '@angular/core';
import { Item } from '../../../models/item.model';
import { User } from '../../../models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../store/actions/user.actions';

interface ItemQuantityForm {
    item: FormControl<string>;
    quantity: FormControl<number>;
}

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnChanges {

    @Input() items!: Item[];
    @Input() user!: User | null;

    protected readonly form: FormGroup<ItemQuantityForm> = initInventoryItemForm();

    protected inventoryItems: { id: string, name: string, quantity: number }[] = [];

    constructor(
        private store: Store<AppState>
    ) {

    }

    ngOnChanges(): void {
        if (this.user?.inventory) {
            const inventoryMap = new Map<string, number>(Object.entries(this.user.inventory));

            this.inventoryItems = this.items
                .filter(item => inventoryMap.has(item.id))
                .map(item => ({ id: item.id, name: item.name, quantity: inventoryMap.get(item.id) || 0 }));
        }
    }

    onSelectItem(item: { id: string; quantity: number }): void {
        this.form.controls.item.setValue(item.id);
        this.form.controls.quantity.setValue(item.quantity);
    }

    onSubmit(): void {
        this.store.dispatch(UserActions.updateMyInventory(this.form.getRawValue()));
    }
}

const initInventoryItemForm = () => new FormGroup<ItemQuantityForm>({
    item: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    quantity: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] })
});
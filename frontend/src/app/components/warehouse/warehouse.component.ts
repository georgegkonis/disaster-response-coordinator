import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item.model';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';
import { AppState } from '../../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { categoriesSelector, itemsSelector } from '../../store/selectors/app.selector';
import { CategoryActions, ItemActions } from '../../store/actions/warehouse.actions';
import { map } from 'rxjs/operators';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DeleteManyRequest } from '../../dto/requests/delete-many-request.dto';

enum Action {
    Create = 'create',
    Update = 'update'
}

interface ItemForm {
    code: FormControl<number>;
    name: FormControl<string>;
    category: FormControl<string>;
    quantity: FormControl<number>;
    details: FormArray<FormGroup<ItemDetailForm>>;
}

interface ItemDetailForm {
    name: FormControl<string>;
    value: FormControl<string>;
}

@Component({
    selector: 'app-warehouse',
    styleUrls: ['./warehouse.component.scss'],
    templateUrl: './warehouse.component.html'
})
export class WarehouseComponent implements OnInit {

    //#region Properties

    protected readonly items$: Observable<Item[]>;
    protected readonly categories$: Observable<Category[]>;
    protected readonly itemForm: FormGroup<ItemForm>;

    protected itemDialogVisible: boolean = false;
    protected itemAction: Action = Action.Create;
    protected selectedItems: Item[] = [];

    private maxCode: number = 1;
    private itemId: string = '';

    //#endregion

    //#region Constructor

    constructor(
        private store: Store<AppState>
    ) {
        this.itemForm = initItemForm();
        this.items$ = store.select(itemsSelector).pipe(map(items => [...items]));
        this.categories$ = store.select(categoriesSelector).pipe(map(categories => [...categories]));
    }

    //#endregion

    //#region Lifecycle Hooks

    ngOnInit(): void {
        this.store.dispatch(ItemActions.load({ request: {} }));
        this.store.dispatch(CategoryActions.load({ request: {} }));

        this.items$.subscribe(items => {
            this.maxCode = items.reduce((max, item) => item.code > max ? item.code : max, 0);
        });
    }

    //#endregion

    //#region Event Handlers

    onCreateItemClick(): void {
        this.itemForm.controls.details.controls = [initDetailForm()];
        this.itemForm.patchValue({ code: this.maxCode + 1 });

        this.itemAction = Action.Create;
        this.itemDialogVisible = true;
    }

    onDeleteItemsClick(): void {
        const request: DeleteManyRequest = { ids: this.selectedItems.map(item => item.id) };
        this.store.dispatch(ItemActions.removeMany({ request }));
    }

    onUpdateItemClick(item: Item): void {
        this.itemForm.controls.details.controls = item.details.map(detail => initDetailForm());
        this.itemForm.patchValue({ ...item, category: item.category.id });

        this.itemId = item.id;
        this.itemAction = Action.Update;
        this.itemDialogVisible = true;
    }

    onDeleteItemClick(id: string): void {
        this.store.dispatch(ItemActions.remove({ id }));
    }

    onSubmitClick(): void {
        switch (this.itemAction) {
            case Action.Create:
                this.store.dispatch(ItemActions.create({ request: this.itemForm.getRawValue() }));
                break;
            case Action.Update:
                this.store.dispatch(ItemActions.update({ id: this.itemId, request: this.itemForm.getRawValue() }));
                break;
        }
        this.itemDialogVisible = false;
        this.itemForm.reset();
    }

    onCancelClick(): void {
        this.itemDialogVisible = false;
        this.itemForm.reset();
    }

    onAddItemDetailClick(): void {
        this.itemForm.controls.details.push(initDetailForm());
    }

    onRemoveItemDetailClick(i: number): void {
        this.itemForm.controls.details.removeAt(i);
    }

    //#endregion
}

const initItemForm = () => new FormGroup<ItemForm>({
    code: new FormControl<number>({ value: 1, disabled: true }, { nonNullable: true }),
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    category: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    quantity: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
    details: new FormArray<FormGroup<ItemDetailForm>>([initDetailForm()], { validators: [Validators.required, Validators.min(1)] })
});

const initDetailForm = () => new FormGroup<ItemDetailForm>({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    value: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
});
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../../models/item.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category.model';
import { AppState } from '../../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { categoriesSelector, itemsSelector } from '../../store/selectors/app.selector';
import { WarehouseActions } from '../../store/actions/warehouse.actions';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, TooltipOptions } from 'primeng/api';
import { FileSelectEvent } from 'primeng/fileupload';
import { ItemActions } from '../../store/actions/item.actions';
import { CategoryActions } from '../../store/actions/category.actions';
import { tooltipOptions } from 'src/app/constants/tooltip-options';

enum ItemAction {
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
export class WarehouseComponent implements OnInit, OnDestroy {

    //#region Properties

    private readonly unsubscribe$: Subject<void> = new Subject<void>();

    protected readonly tooltipOptions: TooltipOptions = tooltipOptions;
    protected readonly items$: Observable<Item[]>;
    protected readonly categories$: Observable<Category[]>;
    protected readonly itemForm: FormGroup<ItemForm>;

    protected itemDialogVisible: boolean = false;
    protected itemAction: ItemAction = ItemAction.Create;
    protected selectedItems: Item[] = [];

    private maxCode: number = 1;
    private activeItemId: string = '';

    //#endregion

    //#region Constructor

    constructor(
        private store: Store<AppState>,
        private confirmationService: ConfirmationService
    ) {
        this.itemForm = initItemForm();
        this.items$ = store.select(itemsSelector);
        this.categories$ = store.select(categoriesSelector);
    }

    //#endregion

    //#region Lifecycle Hooks

    ngOnInit(): void {
        this.store.dispatch(ItemActions.load({ request: {} }));
        this.store.dispatch(CategoryActions.load({ request: {} }));

        this.items$.pipe(takeUntil(this.unsubscribe$)).subscribe(items => {
            this.maxCode = items.reduce((max, item) => item.code > max ? item.code : max, 0);
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();

        this.store.dispatch(ItemActions.reset());
        this.store.dispatch(CategoryActions.reset())
    }

    //#endregion

    //#region Event Handlers

    onImportClick($event: FileSelectEvent): void {
        this.store.dispatch(WarehouseActions.importData({ file: $event.files[0] }));
    }

    onExportClick(): void {
        this.store.dispatch(WarehouseActions.exportData());
    }

    onCreateItemClick(): void {
        this.itemForm.controls.details.clear();
        this.itemForm.controls.details.push(initItemDetailForm());
        this.itemForm.patchValue({ code: this.maxCode + 1 });

        this.itemAction = ItemAction.Create;
        this.itemDialogVisible = true;
    }

    onDeleteItemsClick(): void {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete the selected items?',
            accept: () => this.store.dispatch(ItemActions.deleteMany({ ids: this.selectedItems.map(item => item.id) }))
        });
    }

    onUpdateItemClick(item: Item): void {
        this.itemForm.controls.details.clear();
        item.details.forEach(() => this.itemForm.controls.details.push(initItemDetailForm()));
        this.itemForm.patchValue({ ...item, category: item.category.id });

        this.activeItemId = item.id;
        this.itemAction = ItemAction.Update;
        this.itemDialogVisible = true;
    }

    onDeleteItemClick(id: string): void {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this item?',
            accept: () => this.store.dispatch(ItemActions.$delete({ id }))
        });
    }

    onSubmitClick(): void {
        switch (this.itemAction) {
            case ItemAction.Create:
                this.store.dispatch(ItemActions.create({ request: this.itemForm.getRawValue() }));
                break;
            case ItemAction.Update:
                this.store.dispatch(ItemActions.update({ id: this.activeItemId, request: this.itemForm.getRawValue() }));
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
        this.itemForm.controls.details.push(initItemDetailForm());
    }

    onRemoveItemDetailClick(i: number): void {
        this.itemForm.controls.details.removeAt(i);
    }

    onReloadClick(): void {
        this.store.dispatch(ItemActions.load({ request: {} }));
    }

    //#endregion
}

const initItemForm = () => new FormGroup<ItemForm>({
    code: new FormControl<number>({ value: 1, disabled: true }, { nonNullable: true }),
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    category: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    quantity: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
    details: new FormArray<FormGroup<ItemDetailForm>>([], { validators: [Validators.required, Validators.min(1)] })
});

const initItemDetailForm = () => new FormGroup<ItemDetailForm>({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    value: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
});
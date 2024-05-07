import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { WarehouseActions } from '../../store/app.actions';
import { GetCategoriesRequest } from '../../dto/requests/get-categories-request.dto';
import { GetItemsRequest } from '../../dto/requests/get-items-request.dto';
import { Subscription } from 'rxjs';
import { categoriesSelector, itemsSelector } from '../../store/app.selector';
import { Category } from '../../models/category.model';
import { Item } from '../../models/item.model';
import { CreateCategoryRequest } from '../../dto/requests/create-category-request.dto';
import { CreateItemRequest } from '../../dto/requests/create-item-request.dto';
import { UpdateItemQuantityRequest } from '../../dto/requests/update-item-quantity-request.dto';

@Component({
    selector: 'app-warehouse',
    styleUrls: ['./warehouse.component.scss'],
    templateUrl: './warehouse.component.html'
})
export class WarehouseComponent implements OnInit, OnDestroy {

    private readonly subscriptions: Subscription[] = [];

    protected showUploadDialog = false;
    protected showAddCategoryDialog = false;
    protected showAddItemDialog = false;

    protected categories: Category[] = [];
    protected items: Item[] = [];

    constructor(
        private store: Store<AppState>,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    //#region Subscriptions

    private categoriesSubscription = (): Subscription => this.store.select(categoriesSelector)
        .subscribe(categories => this.categories = categories);

    private itemsSubscription = (): Subscription => this.store.select(itemsSelector)
        .subscribe(items => this.items = items);

    //#endregion

    //#region Lifecycle Hooks

    ngOnInit(): void {
        this.subscriptions.push(
            this.categoriesSubscription(),
            this.itemsSubscription()
        );

        this.loadCategories();
        this.loadItems();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    //#endregion

    //#region Event Handlers

    onUpload(): void {

    }

    //#endregion

    getQuantitySeverity(item: Item): 'success' | 'info' | 'warning' | 'danger' {
        if (item.quantity === 0) {
            return 'danger';
        } else if (item.quantity < 10) {
            return 'warning';
        } else if (item.quantity < 20) {
            return 'info';
        } else {
            return 'success';
        }
    };

    //#region Action Dispatchers

    private loadCategories(): void {
        const request: GetCategoriesRequest = {};
        this.store.dispatch(WarehouseActions.getCategories({ request }));
    }

    private loadItems(): void {
        const request: GetItemsRequest = {};
        this.store.dispatch(WarehouseActions.getItems({ request }));
    }

    private createCategory(): void {
        const request: CreateCategoryRequest = { name: '' };
        this.store.dispatch(WarehouseActions.createCategory({ request }));
    }

    private createItem(): void {
        const request: CreateItemRequest = { name: '', category: '', details: [] };
        this.store.dispatch(WarehouseActions.createItem({ request }));
    }

    private updateItemQuantity(): void {
        const itemId: string = '';
        const request: UpdateItemQuantityRequest = { quantity: 0 };
        this.store.dispatch(WarehouseActions.updateItemQuantity({ itemId, request }));
    }

    private clearWarehouse(): void {
        this.store.dispatch(WarehouseActions.deleteAll());
    }

    //#endregion
    getQuantityStatus(item: Item): string {
        if (item.quantity === 0) {
            return 'Out of Stock';
        } else if (item.quantity < 10) {
            return 'Low Stock';
        } else if (item.quantity < 20) {
            return 'Medium Stock';
        } else {
            return 'In Stock';
        }
    }
}

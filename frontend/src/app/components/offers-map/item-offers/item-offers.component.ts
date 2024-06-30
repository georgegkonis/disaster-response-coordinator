import { Component, Input } from '@angular/core';
import { ItemOffer } from '../../../models/item-offer.model';
import { Item } from '../../../models/item.model';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRole } from '../../../enums/user-role.enum';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers/app.reducer';
import { CookieService } from 'ngx-cookie-service';
import { TaskStatus } from '../../../enums/task-status.enum';
import { ItemOfferActions } from '../../../store/actions/item-offer.actions';

interface ItemOfferForm {
    item: FormControl<string>;
    quantity: FormControl<number>;
}

@Component({
    selector: 'app-item-offers',
    templateUrl: './item-offers.component.html',
    styleUrl: './item-offers.component.scss'
})
export class ItemOffersComponent {

    //#region Properties

    @Input() itemOffers: ItemOffer[] = [];
    @Input() items: Item[] = [];

    protected readonly statusOptions: SelectItem[] = statusOptions;
    protected readonly itemOfferForm: FormGroup<ItemOfferForm>;
    protected readonly userRole: UserRole;

    protected formDialogVisible: boolean = false;

    //#endregion

    //#region Constructor

    constructor(
        private store: Store<AppState>,
        private confirmationService: ConfirmationService,
        cookieService: CookieService
    ) {
        this.itemOfferForm = initItemOfferForm();
        this.userRole = cookieService.get('userRole') as UserRole;
    }

    //#endregion

    dynamicActionButton = (itemOffer: ItemOffer) => {
        if (this.userRole === (UserRole.CITIZEN || UserRole.ADMIN) && itemOffer.status === TaskStatus.PENDING)
            return { onClick: () => this.deleteOffer(itemOffer), icon: 'pi pi-trash', severity: 'danger' };

        if (this.userRole === UserRole.RESCUER && itemOffer.status === TaskStatus.PENDING)
            return { onClick: () => this.acceptOffer(itemOffer), icon: 'pi pi-plus', severity: 'warning' };

        if (this.userRole === UserRole.RESCUER && itemOffer.status === TaskStatus.ACCEPTED)
            return { onClick: () => this.completeOffer(itemOffer), icon: 'pi pi-check', severity: 'success' };

        // TODO: add ability for rescuer to cancel offers

        return null;
    };

    //#region Event Handlers

    onCreate(): void {
        this.formDialogVisible = true;
    }

    onApplyFilters(): void {
        // TODO: implement filtering
    }

    onResetFilters(): void {
        // TODO: implement filtering
    }

    onSubmit(): void {
        this.store.dispatch(ItemOfferActions.create({ request: this.itemOfferForm.getRawValue() }));
        this.formDialogVisible = false;
        this.itemOfferForm.reset();
    }

    onCancel(): void {
        this.formDialogVisible = false;
        this.itemOfferForm.reset();
    }

    //#endregion

    //#region Actions

    private deleteOffer(offer: ItemOffer): void {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this offer?',
            accept: () => this.store.dispatch(ItemOfferActions.$delete({ id: offer.id }))
        });
    }

    private acceptOffer(offer: ItemOffer): void {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to accept this offer?',
            accept: () => this.store.dispatch(ItemOfferActions.updateStatus({ id: offer.id, status: TaskStatus.ACCEPTED }))
        });
    }

    private completeOffer(offer: ItemOffer): void {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to complete this offer?',
            accept: () => this.store.dispatch(ItemOfferActions.updateStatus({ id: offer.id, status: TaskStatus.COMPLETED }))
        });
    }

    //#endregion
}

const statusOptions: SelectItem[] = [
    { label: 'Pending', value: TaskStatus.PENDING },
    { label: 'Accepted', value: TaskStatus.ACCEPTED },
    { label: 'Completed', value: TaskStatus.COMPLETED }
];

const initItemOfferForm = (): FormGroup<ItemOfferForm> => new FormGroup({
    item: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    quantity: new FormControl<number>(1, { nonNullable: true, validators: [Validators.required] })
});

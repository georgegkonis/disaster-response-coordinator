import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemRequest } from '../../../models/item-request.model';
import { AppState } from '../../../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { Item } from '../../../models/item.model';
import { ItemRequestActions } from '../../../store/actions/item-request.actions';
import { CookieService } from 'ngx-cookie-service';
import { UserRole } from '../../../enums/user-role.enum';
import { TaskStatus } from '../../../enums/task-status.enum';
import { ConfirmationService, SelectItem } from 'primeng/api';

interface ItemRequestForm {
    item: FormControl<string>;
    peopleCount: FormControl<number>;
}

@Component({
    selector: 'app-item-requests',
    templateUrl: './item-requests.component.html',
    styleUrl: './item-requests.component.scss'
})
export class ItemRequestsComponent {

    //#region Properties

    @Input() itemRequests: ItemRequest[] = [];
    @Input() items: Item[] = [];

    protected readonly statusOptions: SelectItem[] = statusOptions;
    protected readonly itemRequestForm: FormGroup<ItemRequestForm>;
    protected readonly userRole: UserRole;

    protected formDialogVisible: boolean = false;

    //#endregion

    //#region Constructor

    constructor(
        private store: Store<AppState>,
        private confirmationService: ConfirmationService,
        cookieService: CookieService
    ) {
        this.itemRequestForm = initItemRequestForm();
        this.userRole = cookieService.get('userRole') as UserRole;
    }

    //#endregion

    dynamicActionButton = (itemRequest: ItemRequest) => {
        if (this.userRole === (UserRole.CITIZEN || UserRole.ADMIN) && itemRequest.status === TaskStatus.PENDING)
            return { onClick: () => this.deleteRequest(itemRequest), icon: 'pi pi-trash', severity: 'danger' };

        if (this.userRole === UserRole.RESCUER && itemRequest.status === TaskStatus.PENDING)
            return { onClick: () => this.acceptRequest(itemRequest), icon: 'pi pi-plus', severity: 'warning' };

        if (this.userRole === UserRole.RESCUER && itemRequest.status === TaskStatus.ACCEPTED)
            return { onClick: () => this.completeRequest(itemRequest), icon: 'pi pi-check', severity: 'success' };

        // TODO: add ability for rescuer to cancel requests

        return null;
    };

    //#region Event Handlers

    onCreate(): void {
        this.formDialogVisible = true;
    }

    onApplyFilters(status?: TaskStatus, item?: string): void {
        if (this.userRole === UserRole.CITIZEN) {
            this.store.dispatch(ItemRequestActions.loadMine({ status, item }));
        } else {
            this.store.dispatch(ItemRequestActions.load({ status, item }));
        }
    }

    onResetFilters(): void {
        // TODO: implement filtering
    }

    onSubmit(): void {
        this.store.dispatch(ItemRequestActions.create({ request: this.itemRequestForm.getRawValue() }));
        this.formDialogVisible = false;
        this.itemRequestForm.reset();
    }

    onCancel(): void {
        this.formDialogVisible = false;
        this.itemRequestForm.reset();
    }

    //#endregion

    //#region Actions

    private deleteRequest(request: ItemRequest): void {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this request?',
            accept: () => this.store.dispatch(ItemRequestActions.$delete({ id: request.id }))
        });
    }

    private acceptRequest(request: ItemRequest): void {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to accept this request?',
            accept: () => this.store.dispatch(ItemRequestActions.updateStatus({ id: request.id, status: TaskStatus.ACCEPTED }))
        });
    }

    private completeRequest(request: ItemRequest): void {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to complete this request?',
            accept: () => this.store.dispatch(ItemRequestActions.updateStatus({ id: request.id, status: TaskStatus.COMPLETED }))
        });
    }

    //#endregion
}

const statusOptions: SelectItem[] = [
    { label: 'Pending', value: TaskStatus.PENDING },
    { label: 'Accepted', value: TaskStatus.ACCEPTED },
    { label: 'Completed', value: TaskStatus.COMPLETED }
];

const initItemRequestForm = (): FormGroup<ItemRequestForm> => new FormGroup({
    item: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    peopleCount: new FormControl<number>(1, { nonNullable: true, validators: [Validators.required] })
});


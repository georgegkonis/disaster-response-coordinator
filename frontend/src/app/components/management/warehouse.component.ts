import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';

interface DropdownOption {
    label: string;
    value: string;
}

@Component({
    selector: 'app-warehouse',
    styleUrls: ['./warehouse.component.scss'],
    templateUrl: './warehouse.component.html'
})
export class WarehouseComponent {

    readonly options: DropdownOption[] = [
        { label: 'Products', value: 'products' },
        { label: 'Stores', value: 'stores' },
        { label: 'Categories', value: 'categories' }
    ];

    selectedOption: string = 'products';
    url: string = `http://localhost:8000/api/${this.selectedOption}/upload`;
    data: any;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private store: Store<AppState>
    ) {}

    onUpload(): void {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Data for ${this.selectedOption} uploaded successfully`
        });
    }

    onChange(): void {
        this.url = `http://localhost:8000/api/${this.selectedOption}/upload`;
        console.log(this.url);
    }

    onDelete(): void {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete all data for ${this.selectedOption}?`,
            accept: () => {
                // TODO: implement me
                console.log('Data deleted');
            }
        });
    }
}

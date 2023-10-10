import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

interface DropdownOption {
    label: string;
    value: string;
}

@Component({
    selector: 'app-file-upload',
    styleUrls: ['./management.component.scss'],
    templateUrl: './management.component.html'
})
export class ManagementComponent {

    readonly options: DropdownOption[] = [
        { label: 'Products', value: 'products' },
        { label: 'Stores', value: 'stores' },
        { label: 'Categories', value: 'categories' }
    ];

    selectedOption: string = 'products';
    url: string = `http://localhost:8000/api/${this.selectedOption}/upload`;
    data: any;
    tableCols: any;

    constructor(
        private messageService: MessageService
    ) {}

    onUpload(): void {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Data for ${this.selectedOption} uploaded successfully` });
    }

    onChange(): void {
        this.url = `http://localhost:8000/api/${this.selectedOption}/upload`;
        console.log(this.url)
    }

    onDelete(): void {

    }
}

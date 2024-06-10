import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class AppMessageService {
    constructor(private messageService: MessageService) {}

    showSuccess(message: string, summary?: string) {
        this.messageService.add({ severity: 'success', summary: summary ?? 'Success', detail: message });
    }

    showInfo(message: string, summary?: string) {
        this.messageService.add({ severity: 'info', summary: summary ?? 'Info', detail: message });
    }

    showWarn(message: string, summary?: string) {
        this.messageService.add({ severity: 'warn', summary: summary ?? 'Warning', detail: message });
    }

    showError(message: string, summary?: string) {
        this.messageService.add({ severity: 'error', summary: summary ?? 'Error', detail: message });
    }
}
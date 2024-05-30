import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { itemsSelector } from '../../store/selectors/app.selector';
import { map } from 'rxjs/operators';
import { AnnouncementsActions } from '../../store/actions/announcements.actions';
import { CreateAnnouncementRequest } from '../../dto/requests/create-announcement-request.dto';
import { WarehouseActions } from '../../store/actions/warehouse.actions';

interface AnnouncementForm {
    description: FormControl<string>;
    items: FormControl<string[]>;
}

@Component({
    selector: 'app-create-announcement',
    templateUrl: './create-announcement.component.html',
    styleUrl: './create-announcement.component.scss'
})
export class CreateAnnouncementComponent implements OnInit {

    @Output() created: EventEmitter<void> = new EventEmitter<void>();
    @Output() canceled: EventEmitter<void> = new EventEmitter<void>();

    protected readonly form = new FormGroup<AnnouncementForm>({
        description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        items: new FormControl<string[]>([], { nonNullable: true, validators: [Validators.required] })
    });

    protected readonly items$: Observable<SelectItem[]>;

    constructor(
        private store: Store<AppState>
    ) {
        this.items$ = this.store.select(itemsSelector).pipe(
            map(items => items.map(item => ({ label: item.name, value: item.id })))
        );
    }

    ngOnInit(): void {
        this.store.dispatch(WarehouseActions.getItems({ request: {} }));
    }

    onCreateClick(): void {
        const request: CreateAnnouncementRequest = this.form.getRawValue();

        this.store.dispatch(AnnouncementsActions.create({ request }));
        this.form.reset();
        this.created.emit();
    }

    onCancelClick(): void {
        this.form.reset();
        this.canceled.emit();
    }
}

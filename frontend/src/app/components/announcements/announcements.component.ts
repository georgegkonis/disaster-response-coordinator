import { Component, OnInit } from '@angular/core';
import { Announcement } from '../../models/announcement.model';
import { Observable } from 'rxjs';
import { AppState } from '../../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { announcementsSelector, itemsSelector } from '../../store/selectors/app.selector';
import { AnnouncementsActions } from '../../store/actions/announcements.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { ItemActions } from '../../store/actions/warehouse.actions';
import { map } from 'rxjs/operators';
import { CreateAnnouncementRequest } from '../../dto/requests/create-announcement-request.dto';
import { DeleteManyRequest } from '../../dto/requests/delete-many-request.dto';

interface AnnouncementForm {
    description: FormControl<string>;
    items: FormControl<string[]>;
}

@Component({
    selector: 'app-announcements',
    templateUrl: './announcements.component.html',
    styleUrl: './announcements.component.scss'
})
export class AnnouncementsComponent implements OnInit {

    //#region Properties

    protected displayDialog: boolean = false;
    protected selectedAnnouncementIds: Announcement[] = [];

    protected readonly announcementForm: FormGroup<AnnouncementForm>;
    protected readonly announcements$: Observable<Announcement[]>;
    protected readonly itemsSelection$: Observable<SelectItem<string>[]>;

    //#endregion

    //#region Constructor

    constructor(
        private store: Store<AppState>,
        private confirmationService: ConfirmationService
    ) {
        this.announcementForm = new FormGroup<AnnouncementForm>({
            description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
            items: new FormControl<string[]>([], { nonNullable: true, validators: [Validators.required] })
        });

        this.announcements$ = store.select(announcementsSelector);
        this.itemsSelection$ = store.select(itemsSelector).pipe(
            map(items => items.map(item => ({ label: item.name, value: item.id })))
        );
    }

    //#endregion

    //#region Lifecycle Hooks

    ngOnInit(): void {
        this.store.dispatch(AnnouncementsActions.load());
        this.store.dispatch(ItemActions.load({ request: {} }));
    }

    //#endregion

    //#region Event Handlers

    onAddClick(): void {
        this.displayDialog = true;
    }

    onRemoveSelectedClick(): void {
        const request: DeleteManyRequest = {
            ids: this.selectedAnnouncementIds.map(announcement => announcement.id)
        };

        this.confirmationService.confirm({
            message: 'Please confirm that you want to remove the selected announcements.',
            accept: () => {
                this.store.dispatch(AnnouncementsActions.removeMany({ request }));
                this.selectedAnnouncementIds = [];
            }
        });
    }

    onRefreshClick(): void {
        this.store.dispatch(AnnouncementsActions.load());
    }

    onRemoveClick(id: string): void {
        this.confirmationService.confirm({
            message: 'Please confirm that you want to remove this announcement.',
            accept: () => this.store.dispatch(AnnouncementsActions.remove({ id }))
        });
    }

    onSubmitClick(): void {
        const request: CreateAnnouncementRequest = this.announcementForm.getRawValue();
        console.log(request);
        this.store.dispatch(AnnouncementsActions.create({ request }));
        this.displayDialog = false;
        this.announcementForm.reset();
    }

    onCancelClick(): void {
        this.displayDialog = false;
        this.announcementForm.reset();
    }

    //#endregion
}

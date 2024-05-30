import { Component, OnInit } from '@angular/core';
import { Announcement } from '../../models/announcement.model';
import { Observable } from 'rxjs';
import { AppState } from '../../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { announcementsSelector } from '../../store/selectors/app.selector';
import { AnnouncementsActions } from '../../store/actions/announcements.actions';

@Component({
    selector: 'app-announcements',
    templateUrl: './announcements.component.html',
    styleUrl: './announcements.component.scss'
})
export class AnnouncementsComponent implements OnInit {

    protected readonly announcements$: Observable<Announcement[]>;
    protected displayDialog: boolean = false;

    constructor(
        private store: Store<AppState>
    ) {
        this.announcements$ = store.select(announcementsSelector);
    }

    ngOnInit(): void {
        this.store.dispatch(AnnouncementsActions.load());
    }

    onCreateClick(): void {
        this.displayDialog = true;
    }

    onRemoveClick(id: string): void {
        this.store.dispatch(AnnouncementsActions.remove({ id }));
    }

    onCreated($event: void): void {
        this.displayDialog = false;
        this.store.dispatch(AnnouncementsActions.load());
    }

    onCanceled($event: void): void {
        this.displayDialog = false;
    }
}

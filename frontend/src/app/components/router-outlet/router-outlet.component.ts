import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { Message } from 'primeng/api';
import { selectMessage } from '../../store/app.selector';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './router-outlet.component.html',
    styleUrls: ['./router-outlet.component.scss']
})
export class RouterOutletComponent implements OnInit, OnDestroy {
    title: string = 'frontend';
    messages: Message[] = [];

    private subscription: Subscription = new Subscription();

    private messageSubscription: Subscription = this.store.select(selectMessage)
        .subscribe((message: Message | null) => {
            if (message) this.messages = [message];
        });

    constructor(
        private store: Store<AppState>
    ) { }

    ngOnInit(): void {
        this.subscription.add(this.messageSubscription);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

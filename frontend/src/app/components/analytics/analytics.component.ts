import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemRequest } from '../../models/item-request.model';
import { Observable, Subject } from 'rxjs';
import { ItemOffer } from '../../models/item-offer.model';
import { AppState } from '../../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { TaskStatus } from '../../enums/task-status.enum';
import { ItemRequestActions } from '../../store/actions/item-request.actions';
import { ItemOfferActions } from '../../store/actions/item-offer.actions';
import { map, takeUntil } from 'rxjs/operators';
import { itemOffersSelector, itemRequestsSelector } from '../../store/selectors/app.selector';

const pendingColor: string = 'rgb(145,8,8)';
const acceptedColor: string = 'rgb(212,223,33)';
const completedColor: string = 'rgb(59,186,11)';

const pendingColorHover: string = 'rgba(145,8,8,0.45)';
const acceptedColorHover: string = 'rgba(212,223,33,0.51)';
const completedColorHover: string = 'rgba(59,186,11,0.54)';

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent implements OnInit, OnDestroy {

    private readonly unsubscribe$ = new Subject<void>();

    private readonly itemRequests$!: Observable<ItemRequest[]>;
    private readonly itemOffers$!: Observable<ItemOffer[]>;

    protected fromDate: Date = new Date('2024-01-01');
    protected toDate: Date = new Date();

    protected itemRequestData: any;
    protected itemOfferData: any;

    protected itemOfferOptions: any = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: 'white'
                }
            },
            title: {
                display: true,
                text: 'Item Offers',
                color: 'white'
            }
        }
    };

    protected itemRequestOptions: any = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: 'white'
                }
            },
            title: {
                display: true,
                text: 'Item Requests',
                color: 'white'
            }
        }
    };

    private itemOffersSubscription = () => this.itemOffers$.pipe(takeUntil(this.unsubscribe$)).subscribe(itemOffers =>
        this.itemOfferData = {
            labels: [...Object.values(TaskStatus)],
            datasets: [
                {
                    data: [
                        itemOffers.filter(itemOffer => itemOffer.status === TaskStatus.PENDING).length,
                        itemOffers.filter(itemOffer => itemOffer.status === TaskStatus.ACCEPTED).length,
                        itemOffers.filter(itemOffer => itemOffer.status === TaskStatus.COMPLETED).length
                    ],
                    backgroundColor: [pendingColor, acceptedColor, completedColor],
                    hoverBackgroundColor: [pendingColorHover, acceptedColorHover, completedColorHover]
                }
            ]
        });

    private itemRequestsSubscription = () => this.itemRequests$.pipe(takeUntil(this.unsubscribe$)).subscribe(itemRequests => {
        this.itemRequestData = {
            labels: [...Object.values(TaskStatus)],
            datasets: [
                {
                    data: [
                        itemRequests.filter(itemRequest => itemRequest.status === TaskStatus.PENDING).length,
                        itemRequests.filter(itemRequest => itemRequest.status === TaskStatus.ACCEPTED).length,
                        itemRequests.filter(itemRequest => itemRequest.status === TaskStatus.COMPLETED).length
                    ],
                    backgroundColor: [pendingColor, acceptedColor, completedColor],
                    hoverBackgroundColor: [pendingColorHover, acceptedColorHover, completedColorHover]
                }
            ]
        };
    });

    constructor(private store: Store<AppState>) {
        this.itemRequests$ = this.store.select(itemRequestsSelector).pipe(
            map(itemRequests => itemRequests.filter(itemRequest => {
                return new Date(itemRequest.createdAt) >= this.fromDate
                    && new Date(itemRequest.createdAt) <= this.toDate;
            }))
        );

        this.itemOffers$ = this.store.select(itemOffersSelector).pipe(
            map(itemOffers => itemOffers.filter(itemOffer => {
                return new Date(itemOffer.createdAt) >= this.fromDate
                    && new Date(itemOffer.createdAt) <= this.toDate;
            }))
        );
    }

    ngOnInit(): void {
        this.itemOffersSubscription();
        this.itemRequestsSubscription();

        this.store.dispatch(ItemRequestActions.load({}));
        this.store.dispatch(ItemOfferActions.load({}));
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();

        this.store.dispatch(ItemRequestActions.reset());
        this.store.dispatch(ItemOfferActions.reset());
    }

    filterDates(): void {
        this.store.dispatch(ItemRequestActions.load({}));
        this.store.dispatch(ItemOfferActions.load({}));
    }
}

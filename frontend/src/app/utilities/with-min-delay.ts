import { delay, forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export function withMinDelay<T>(source$: Observable<T>, amount: number = 250): Observable<T> {
    const delay$ = of(null).pipe(delay(amount));
    return forkJoin([source$, delay$]).pipe(
        map(([result]) => result)
    );
}
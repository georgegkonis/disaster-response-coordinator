import { delay, forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export function withMinDelay<T>(source$: Observable<T>): Observable<T> {
    const delay$ = of(null).pipe(delay(500));
    return forkJoin([source$, delay$]).pipe(
        map(([result]) => result)
    );
}
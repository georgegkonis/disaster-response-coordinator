import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppState } from '../store/app.reducer';
import { selectIsAuthenticated } from '../store/app.selector';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const store = inject(Store) as Store<AppState>;
    const router = inject(Router);

    return store.select(selectIsAuthenticated).pipe(
        map(isAuthenticated => {
            if (!isAuthenticated) {
                router.navigate(['/login']).then();
                return false;
            }
            return true;
        })
    );
};

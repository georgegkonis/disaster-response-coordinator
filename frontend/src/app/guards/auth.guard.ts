import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppState } from '../store/app.reducer';
import { isAuthenticatedSelector } from '../store/app.selector';

export const authGuard: CanActivateFn = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
    const store = inject(Store) as Store<AppState>;
    const router = inject(Router);

    return store.select(isAuthenticatedSelector).pipe(
        map((isAuthenticated: boolean) => {
            if (!isAuthenticated) {
                router.navigate(['/login']).then();
                return false;
            }
            return true;
        })
    );
};

import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { Role } from '../enums/user-role.enum';
import { roleSelector } from '../store/app.selector';
import { map } from 'rxjs/operators';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
    const role = route.data['role'] as Role;
    const store = inject(Store) as Store<AppState>;

    return store.select(roleSelector).pipe(
        map((currentRole: Role | null) => currentRole === role)
    )
};

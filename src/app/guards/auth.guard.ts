import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainStore } from '../state/store/main-store';
import { UserRoles } from '../types';
import { ROUTE_NAMES } from '../constants';
import { NotificationService } from '../services/notification-service';
import { ApplicationStateManager } from '../state/managers/application-state-manager';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private readonly _router: Router,
        private readonly _notificationService: NotificationService
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const currentUserRole = ApplicationStateManager.getCurrentUserRole();

        // Learner can access only preview component while content manager can access every page.
        const accessAllowed = currentUserRole === UserRoles.ContentManager
            || (next.routeConfig.path === ROUTE_NAMES.Learning && currentUserRole === UserRoles.Learner);

        if (accessAllowed) {
            return true;
        }

        this._router.navigate(['']);
        this._notificationService.error('You have no rights to access this page.');
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainStorage } from '../storage/main-storage';
import { UserTypes } from '../types';
import { ROUTE_NAMES } from '../constants';
import { NotificationService } from '../services/notification-service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private readonly _router: Router,
        private readonly _notificationService: NotificationService
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // Learner can access only preview component while content manager can access every page.
        const accessAllowed = (next.routeConfig.path === ROUTE_NAMES.Learning && MainStorage.currentUser === UserTypes.Learner)
            || (MainStorage.currentUser === UserTypes.ContentManager);

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

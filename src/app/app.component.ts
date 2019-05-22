import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoles } from './types';
import { ROUTE_NAMES } from './constants';
import { ApplicationStateManager } from './state/managers/application-state-manager';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Denis Semionov Learning Management System';

    constructor(private readonly _router: Router) {
        /**
         * Uncomment for automatic authorization on page load
         * Useful for debugging purposes
         */

        // ApplicationStateManager.setCurrentUserRole(UserRoles.ContentManager);
        // this._router.navigate([ROUTE_NAMES.Content, ROUTE_NAMES.Management]);
    }
}

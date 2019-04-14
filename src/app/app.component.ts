import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainStorage } from './storage/main-storage';
import { UserTypes } from './types';
import { ROUTE_NAMES } from './constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Denis Semionov Learning Management System';

    //  Temp
    constructor(private router: Router) {
        MainStorage.currentUser = UserTypes.ContentManager;
        this.router.navigate([ROUTE_NAMES.Content, ROUTE_NAMES.Management]);
    }
}

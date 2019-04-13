import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainStorage } from './storage/main-storage';
import { UserTypes } from './types';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Denis Semionov Learning Management System';

    //  Temp
    constructor(private router: Router) {
        MainStorage.currentUser = UserTypes.Learner;
        this.router.navigate(['content/learning']);
    }
}

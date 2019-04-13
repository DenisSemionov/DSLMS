import { Component, OnInit } from '@angular/core';
import { MainStorage } from 'src/app/storage/main-storage';
import { Router } from '@angular/router';
import { RouteNames } from 'src/app/constants';
import { UserTypes } from 'src/app/types';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private readonly _router: Router) { }

    ngOnInit() {
    }

    public getCurrentUser(): UserTypes | null {
        return MainStorage.currentUser;
    }

    public logout(): void {
        MainStorage.currentUser = null;
        this._router.navigate([RouteNames.Login]);
    }

    public navigateToAboutPage(): void {
        MainStorage.previousUrl = this._router.url;
        this._router.navigate([RouteNames.About]);
    }

}

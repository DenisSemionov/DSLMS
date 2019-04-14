import { Component } from '@angular/core';
import { MainStorage } from 'src/app/storage/main-storage';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from 'src/app/constants';
import { UserTypes } from 'src/app/types';
import { MatDialog } from '@angular/material';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    constructor(
        private readonly _router: Router,
        private readonly _dialogService: MatDialog) { }

    public getCurrentUser(): UserTypes | null {
        return MainStorage.currentUser;
    }

    public logout(): void {
        // Open confirmation dialog
        this._dialogService.open(LogoutDialogComponent, {
            width: '300px',
            autoFocus: false
        });
    }

    public navigateToAboutPage(): void {
        MainStorage.previousUrl = this._router.url;
        this._router.navigate([ROUTE_NAMES.About]);
    }

}

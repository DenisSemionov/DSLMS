import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MainStorage } from 'src/app/storage/main-storage';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from 'src/app/constants';

@Component({
    selector: 'app-logout-dialog',
    templateUrl: './logout-dialog.component.html',
    styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent {

    constructor(
        private readonly _router: Router,
        private readonly _dialogRef: MatDialogRef<LogoutDialogComponent>) { }

    public logout(): void {
        MainStorage.currentUser = null;
        this._router.navigate([ROUTE_NAMES.Login]);

        this._dialogRef.close();
    }
}

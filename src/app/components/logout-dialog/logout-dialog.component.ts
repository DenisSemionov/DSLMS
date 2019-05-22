import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MainStore } from 'src/app/state/store/main-store';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from 'src/app/constants';
import { ApplicationStateManager } from 'src/app/state/managers/application-state-manager';

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
        ApplicationStateManager.resetCurrentUser();
        this._router.navigate([ROUTE_NAMES.Login]);

        this._dialogRef.close();
    }
}

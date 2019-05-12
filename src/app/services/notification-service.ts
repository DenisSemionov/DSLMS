import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationService {
    constructor(private readonly _snackBar: MatSnackBar) { }

    public success(message: string) {
        this._snackBar.open(message, 'Close', {
            duration: 4000,
            panelClass: 'success-background'
        });
    }

    public error(message: string) {
        this._snackBar.open(message, 'Close', {
            duration: 8000,
            panelClass: 'warn-background'
        });
    }
}
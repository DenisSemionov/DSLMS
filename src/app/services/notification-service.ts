import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationService {
    constructor(private readonly _snackBar: MatSnackBar) { }

    public common(message: string) {
        this._snackBar.open(message, 'Close', {
            duration: 3000
        });
    }

    public error(message: string) {
        this._snackBar.open(message, 'Close', {
            duration: 8000,
            panelClass: 'warn-background'
        });
    }
}
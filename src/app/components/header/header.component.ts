import { Component } from '@angular/core';
import { MainStore } from 'src/app/state/store/main-store';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from 'src/app/constants';
import { UserRoles, Themes } from 'src/app/types';
import { MatDialog } from '@angular/material';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { ApplicationStateManager } from 'src/app/state/managers/application-state-manager';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    private currentTheme = Themes.Dark;

    public constructor(
        private readonly _router: Router,
        private readonly _dialogService: MatDialog) { }

    public getCurrentUser(): UserRoles | null {
        return ApplicationStateManager.getCurrentUserRole();
    }

    public toggleTheme(): void {
        ApplicationStateManager.toggleTheme();
    }

    public isDarkTheme(): boolean {
        return ApplicationStateManager.isDarkTheme();
    }

    public logout(): void {
        // Open confirmation dialog
        this._dialogService.open(LogoutDialogComponent, {
            width: '300px',
            autoFocus: false
        });
    }

    public navigateToAboutPage(): void {
        ApplicationStateManager.setPreviousUrl(this._router.url);
        this._router.navigate([ROUTE_NAMES.About]);
    }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationStateManager } from 'src/app/state/managers/application-state-manager';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent {

    constructor(private readonly _router: Router) { }

    public navigateToPreviousPage(): void {
        this._router.navigate([ApplicationStateManager.getPreviousPageUrl()]);
    }
}

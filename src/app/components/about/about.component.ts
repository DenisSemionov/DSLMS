import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainStorage } from 'src/app/storage/main-storage';
import { RouteNames } from 'src/app/constants';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    constructor(private readonly _router: Router) { }

    ngOnInit() {
    }

    public navigateToPreviousPage(): void {
        if (MainStorage.previousUrl !== null) {
            this._router.navigate([MainStorage.previousUrl]);
        } else {
            this._router.navigate([RouteNames.Login]);
        }
    }

}

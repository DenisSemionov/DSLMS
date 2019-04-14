import { Component, OnInit } from '@angular/core';
import { ClassModel } from 'src/app/types';
import { MainStorage } from 'src/app/storage/main-storage';

@Component({
    selector: 'content-preview',
    templateUrl: './content-preview.component.html',
    styleUrls: ['./content-preview.component.scss']
})
export class ContentPreviewComponent implements OnInit {

    constructor() { }

    public ngOnInit() {
    }

    public getAllClasses(): Array<ClassModel> {
        return MainStorage.allClasses;
    }

}

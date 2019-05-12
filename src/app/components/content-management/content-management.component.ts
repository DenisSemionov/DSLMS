import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormGroupDirective } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { MainStorage } from 'src/app/storage/main-storage';
import { ClassModel, ClassAnswerModel } from 'src/app/types';
import { Subscription } from 'rxjs';
import { ContentPreviewComponent } from '../content-preview/content-preview.component';

@Component({
    selector: 'content-management',
    templateUrl: './content-management.component.html',
    styleUrls: ['./content-management.component.scss'],
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({ transform: 'translateX(100%)', opacity: 0 }),
                    animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
                ]),
                transition(':leave', [
                    style({ transform: 'translateX(0)', opacity: 1 }),
                    animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
                ])
            ]
        )
    ],
})
export class ContentManagementComponent implements OnInit {
    @ViewChild('formDirective', { read: FormGroupDirective }) private formDirective: FormGroupDirective;

    @ViewChild('preview') private preview: ContentPreviewComponent;

    // Form for new task creation
    public form: FormGroup;
    public isFormSubmitted = false;
    public showManagementTab = true;
    public previewClass: ClassModel = null;

    private _answers: FormArray;
    private _subscriptions: Array<Subscription> = [];

    constructor() { }

    public ngOnInit() {
        this.initForms();

        this.initSubscriptions();

        this.generateMandatoryFields();
    }

    public createClass(): void {
        this.isFormSubmitted = true;

        if (this.form.invalid) {
            return;
        }

        const classModel = new ClassModel();
        classModel.name = this.form.controls.name.value.trim();
        classModel.question = this.form.controls.question.value.trim();
        classModel.answers = this._answers.value.map((o: ClassAnswerModel) => new ClassAnswerModel(o));

        // Add new class to storage
        MainStorage.allClasses.push(classModel);

        // Select newly created class for preview
        this.preview.selectClass(MainStorage.allClasses.length - 1);

        this.resetForm();
    }

    // Reset all form values
    public resetForm(): void {
        this.form.controls.name.patchValue('');
        this.form.controls.question.patchValue('');

        // Leave 1 answer
        for (let i = this._answers.length - 1; i > 0; i--) {
            this._answers.removeAt(i);
        }

        this._answers.controls[0].get('text').patchValue('');
        this._answers.controls[0].get('isCorrect').patchValue(false);


        this.formDirective.resetForm();
        // this.form.reset();
        // // this.form.markAsPristine();
        // // this.form.markAsUntouched();
        // // this.form.updateValueAndValidity();
        this.isFormSubmitted = false;
    }

    public addAnswer(): void {
        this._answers.push(
            new FormGroup({
                text: new FormControl('', [Validators.required, Validators.maxLength(30)]),
                isCorrect: new FormControl(false)
            })
        );
    }

    public removeAnswer(index: number): void {
        this._answers.removeAt(index);
    }

    public togglePreviewWindowSize(): void {
        this.showManagementTab = !this.showManagementTab;
    }

    private initForms(): void {
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
            question: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            answers: new FormArray([], [Validators.minLength(1)])
        });

        this._answers = <FormArray>this.form.controls.answers;
    }

    private initSubscriptions(): void {
        this._subscriptions.push(
            this.form.valueChanges.subscribe(formValue => {
                if (this.previewClass === null) {
                    this.previewClass = new ClassModel();
                }
                this.previewClass.name = (formValue.name || '').trim();
                this.previewClass.question = (formValue.question || '').trim();
                this.previewClass.answers = formValue.answers.map(o => new ClassAnswerModel(o));
            })
        );
    }

    private generateMandatoryFields(): void {
        this.addAnswer();
    }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormGroupDirective } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { MainStorage } from 'src/app/storage/main-storage';
import { ClassModel, ClassAnswerModel } from 'src/app/types';

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

    // Form for new task creation
    public form: FormGroup;
    public isFormSubmitted = false;
    public showManagementTab = true;

    private answers: FormArray;

    constructor() { }

    public ngOnInit() {
        this.initForms();

        this.generateMandatoryFields();
    }

    public createClass(): void {
        this.isFormSubmitted = true;

        if (this.form.valid) {
            const classModel = new ClassModel();
            classModel.name = this.form.controls.name.value.trim();
            classModel.question = this.form.controls.question.value.trim();
            classModel.answers = this.answers.value.map((o: ClassAnswerModel) => new ClassAnswerModel(o));

            // Add new class to storage
            MainStorage.allClasses.push(classModel);
            this.resetForm();
        }
    }

    // Reset all form values
    public resetForm(): void {
        this.form.controls.name.patchValue('');
        this.form.controls.question.patchValue('');

        // Leave 1 answer
        for (let i = this.answers.length - 1; i > 0; i--) {
            this.answers.removeAt(i);
        }

        this.answers.controls[0].get('text').patchValue('');
        this.answers.controls[0].get('isCorrect').patchValue(false);


        this.formDirective.resetForm();
        // this.form.reset();
        // // this.form.markAsPristine();
        // // this.form.markAsUntouched();
        // // this.form.updateValueAndValidity();
        this.isFormSubmitted = false;
    }

    public addAnswer(): void {
        this.answers.push(
            new FormGroup({
                text: new FormControl('', [Validators.required, Validators.maxLength(30)]),
                isCorrect: new FormControl(false)
            })
        );
    }

    public removeAnswer(index: number): void {
        this.answers.removeAt(index);
    }

    public togglePreviewWindowSize(): void {
        this.showManagementTab = !this.showManagementTab;
    }

    private initForms(): void {
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            question: new FormControl('', [Validators.required, Validators.maxLength(30)]),
            answers: new FormArray([], [Validators.minLength(1)])
        });

        this.answers = <FormArray>this.form.controls.answers;
    }

    private generateMandatoryFields(): void {
        this.addAnswer();
    }
}

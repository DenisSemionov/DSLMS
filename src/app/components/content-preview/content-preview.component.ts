import { Component, OnInit, Input } from '@angular/core';
import { ClassModel, ClassAnswerModel, UserRoles } from 'src/app/types';
import { MainStore } from 'src/app/state/store/main-store';
import { MatDialog } from '@angular/material';
import { FeedbackDialogComponent } from '../feedback-dialog/feedback-dialog.component';
import { ApplicationStateManager } from 'src/app/state/managers/application-state-manager';

@Component({
    selector: 'content-preview',
    templateUrl: './content-preview.component.html',
    styleUrls: ['./content-preview.component.scss']
})
export class ContentPreviewComponent implements OnInit {
    @Input('previewClass')
    set previewClass(value: ClassModel) {
        this._previewClass = value;

        if (this.selectedClass && value && this.isPreviewClassSelected) {
            this.selectPreviewClass();
        }
    }

    public _previewClass: ClassModel = null;
    public selectedClass: ClassModel = null;
    public selectedAnswers: Array<number> = [];

    public isPreviewClassSelected: boolean = false;

    constructor(private readonly _dialogService: MatDialog) {
    }

    public ngOnInit() {
    }

    public getAllClasses(): Array<ClassModel> {
        return ApplicationStateManager.getAllClasses();
    }

    public showAnswerIcon(): boolean {
        return ApplicationStateManager.getCurrentUserRole() === UserRoles.ContentManager;
    }

    public isAnswerCorrect(answer: ClassAnswerModel): boolean {
        return answer.isCorrect;
    }

    public submitAnswers(): void {
        if (this.selectedAnswers.length > 0) {
            let correctAnswerAmount = this.selectedClass.answers.length;

            // Calculate correct and incorrect answers amount
            for (let i = 0; i < this.selectedClass.answers.length; i++) {
                // If this answer is not selected
                if (this.selectedAnswers.indexOf(i) === -1) {
                    // If answer is correct, it should have been selected, minus one correct answer
                    correctAnswerAmount += this.selectedClass.answers[i].isCorrect ? (-1) : 0;
                } else {
                    // If answer selected and it is not correct, minus one correct answer
                    correctAnswerAmount += this.selectedClass.answers[i].isCorrect ? 0 : (-1);
                }
            }

            const incorrectAnswerAmount = this.selectedClass.answers.length - correctAnswerAmount;
            this.clearPreviouslySelectedAnswers();

            this._dialogService.open(FeedbackDialogComponent,
                {
                    data: { correctAnswerAmount, incorrectAnswerAmount },
                    width: '350px',
                    height: '190px',
                    autoFocus: false
                });
        }
    }

    public isAnswerSelected(index: number): boolean {
        return this.selectedAnswers.indexOf(index) !== -1;
    }

    public selectAnswer(index: number): void {
        const answerIndex = this.selectedAnswers.indexOf(index);

        if (answerIndex === -1) {
            this.selectedAnswers.push(index);
        } else {
            this.selectedAnswers.splice(answerIndex, 1);
        }
    }

    public isClassSelected(classModel: ClassModel): boolean {
        return this.selectedClass && !this.isPreviewClassSelected
            ? classModel.name === this.selectedClass.name
            : false;
    }

    public selectClass(index: number): void {
        this.clearPreviouslySelectedAnswers();

        this.isPreviewClassSelected = false;

        this.selectedClass = this.getAllClasses()[index];
    }

    public selectPreviewClass(): void {
        this.clearPreviouslySelectedAnswers();

        this.isPreviewClassSelected = true;

        this.selectedClass = this._previewClass;
    }

    private clearPreviouslySelectedAnswers(): void {
        this.selectedAnswers = [];
    }
}

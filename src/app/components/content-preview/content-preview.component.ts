import { Component, OnInit, Input } from '@angular/core';
import { ClassModel, ClassAnswerModel, UserTypes } from 'src/app/types';
import { MainStorage } from 'src/app/storage/main-storage';
import { MatDialog } from '@angular/material';
import { FeedbackDialogComponent } from '../feedback-dialog/feedback-dialog.component';

@Component({
    selector: 'content-preview',
    templateUrl: './content-preview.component.html',
    styleUrls: ['./content-preview.component.scss']
})
export class ContentPreviewComponent implements OnInit {
    @Input('previewObject')
    set previewObject(value: ClassModel) {
        this.previewClass = value;

        if (this.selectedClass && value) {
            if (this.isPreviewClassSelected) {
                this.selectPreviewClass();
            }
        }

    }

    public previewClass: ClassModel = null;
    public selectedClass: ClassModel = null;
    public selectedAnswers: Array<number> = [];

    private isPreviewClassSelected: boolean = false;

    constructor(private readonly _dialogService: MatDialog) {

    }

    public ngOnInit() {
    }

    public getAllClasses(): Array<ClassModel> {
        return MainStorage.allClasses;
    }

    public showAnswerIcon(): boolean {
        return MainStorage.currentUser === UserTypes.ContentManager;
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
        if (this.selectedClass) {
            return classModel.name === this.selectedClass.name;
        }
        return false;
    }

    public selectClass(index: number): void {
        this.clearPreviouslySelectedAnswers();

        this.isPreviewClassSelected = false;

        this.selectedClass = this.getAllClasses()[index];
    }

    public selectPreviewClass(): void {
        this.clearPreviouslySelectedAnswers();

        this.isPreviewClassSelected = true;

        this.selectedClass = this.previewClass;
    }

    private clearPreviouslySelectedAnswers(): void {
        this.selectedAnswers = [];
    }
}

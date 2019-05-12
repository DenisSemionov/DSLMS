import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-feedback-dialog',
    templateUrl: './feedback-dialog.component.html',
    styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent {

    public correctAnswerAmount = 0;
    public incorrectAnswerAmount = 0;

    constructor(@Inject(MAT_DIALOG_DATA) private data: { correctAnswerAmount: number, incorrectAnswerAmount: number }) {
        if (this.data) {
            this.correctAnswerAmount = data.correctAnswerAmount;
            this.incorrectAnswerAmount = data.incorrectAnswerAmount;
        }
    }
}

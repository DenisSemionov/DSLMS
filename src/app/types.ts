export enum UserTypes {
    ContentManager = 'ContentManager',
    Learner = 'Learner'
}

export class ClassAnswerModel {
    text: string;
    isCorrect: boolean;

    constructor(answer: ClassAnswerModel) {
        this.text = answer.text;
        this.isCorrect = answer.isCorrect;
    }
}

export class ClassModel {
    name: string;
    question: string;
    answers: Array<ClassAnswerModel>;

    constructor(value: ClassModel = null) {
        if (value !== null) {
            this.name = value.name;
            this.question = value.question;
            this.answers = value.answers;
        }
    }
}
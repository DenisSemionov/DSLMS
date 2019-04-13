export enum UserTypes {
    ContentManager = 'ContentManager',
    Learner = 'Learner'
}

export type TaskAnswer = {
    isCorrect: boolean;
    text: string;
}

export type TaskQuestion = {
    text: string;
}

export type Task = {
    name: string;
    questions: Array<TaskQuestion>;
    answers: Array<TaskAnswer>;
}
import { ClassModel, ClassAnswerModel } from './types';

const FIRST_CLASS: ClassModel = {
    name: 'First class',
    question: 'First class is the most simple one. Can you answer correctly?',
    answers: [
        new ClassAnswerModel({
            text: 'This one is correct',
            isCorrect: true
        }),
        new ClassAnswerModel({
            text: 'This one is not',
            isCorrect: false
        }),
        new ClassAnswerModel({
            text: 'What about this one?',
            isCorrect: false
        })
    ]
};

const SECOND_CLASS: ClassModel = {
    name: 'Second class',
    question: 'Second class is tricky. Will you be able to get it?',
    answers: [
        new ClassAnswerModel({
            text: 'Select me!!!',
            isCorrect: false
        }),
        new ClassAnswerModel({
            text: 'Do not select me!',
            isCorrect: true
        })
    ]
};

const THIRD_CLASS: ClassModel = {
    name: 'Third class',
    question: 'Third class question is kind of more simple :)',
    answers: [
        new ClassAnswerModel({
            text: 'Well...',
            isCorrect: true
        }),
        new ClassAnswerModel({
            text: 'Answer two!',
            isCorrect: true
        })
    ]
};

export enum ROUTE_NAMES {
    Login = 'login',
    Content = 'content',
    Learning = 'learning',
    Management = 'management',
    About = 'about'
};

export const PREDEFINED_CLASSES: Array<ClassModel> = [FIRST_CLASS, SECOND_CLASS, THIRD_CLASS];


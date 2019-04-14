import { ClassModel } from './types';

const FIRST_CLASS: ClassModel = {
    name: 'First class',
    question: '',
    answers: []
};

const SECOND_CLASS: ClassModel = {
    name: 'Second class',
    question: '',
    answers: []
};

const THIRD_CLASS: ClassModel = {
    name: 'Third class',
    question: '',
    answers: []
};

export enum ROUTE_NAMES {
    Login = 'login',
    Content = 'content',
    Learning = 'learning',
    Management = 'management',
    About = 'about'
};

export const PREDEFINED_CLASSES: Array<ClassModel> = [FIRST_CLASS, SECOND_CLASS, THIRD_CLASS];


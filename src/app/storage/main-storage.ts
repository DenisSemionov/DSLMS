import { UserTypes, ClassModel } from '../types';
import { PREDEFINED_CLASSES } from '../constants';

export abstract class MainStorage {
    public static currentUser: UserTypes | null = null;

    public static previousUrl: string | null = null;

    public static allClasses: Array<ClassModel> = PREDEFINED_CLASSES;
}
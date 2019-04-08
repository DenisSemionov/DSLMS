import { UserTypes } from '../types';

export abstract class MainStorage {
    public static currentUser: UserTypes = null;

    public static currentValue: string = "I am static storage value";
}
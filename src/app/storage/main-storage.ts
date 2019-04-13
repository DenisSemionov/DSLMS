import { UserTypes, Task } from '../types';

export abstract class MainStorage {
    public static currentUser: UserTypes | null = null;

    public static previousUrl: string | null = null;

    public static allTasks: Array<Task> = [];
}
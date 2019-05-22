import { MainStore } from '../store/main-store';
import { Themes, ClassModel, UserRoles } from '../../types';
import { ROUTE_NAMES } from '../../constants';

export abstract class ApplicationStateManager extends MainStore {
    // User management
    public static getCurrentUserRole(): UserRoles {
        return this.currentUser;
    }

    public static setCurrentUserRole(role: UserRoles): void {
        this.currentUser = role;
    }

    public static resetCurrentUser(): void {
        this.currentUser = null;
    }

    // Previous page url
    public static setPreviousUrl(url: string): void {
        this.previousUrl = url;
    }

    public static getPreviousPageUrl(): string {
        return this.previousUrl !== null
            ? this.previousUrl
            : ROUTE_NAMES.Login;
    }

    // Classes management
    public static getClass(index: number): ClassModel {
        // Ensure safe fetch
        return index >= this.allClasses.length
            ? null
            : this.allClasses[index];
    }

    public static getAllClasses(): Array<ClassModel> {
        return this.allClasses;
    }

    public static getClassesAmount(): number {
        return this.allClasses.length;
    }

    public static createClass(classModel: ClassModel): void {
        this.allClasses.push(classModel);
    }

    // Global theme
    public static toggleTheme(): void {
        this.applicationTheme = this.isDarkTheme()
            ? Themes.Light
            : Themes.Dark;
    }

    public static isDarkTheme(): boolean {
        return this.applicationTheme === Themes.Dark;
    }
}
import { UserRoles, ClassModel, Themes } from '../../types';
import { PREDEFINED_CLASSES } from '../../constants';

// Can be accessed only by application state managers
export abstract class MainStore {
    // Current user role
    protected static currentUser: UserRoles | null = null;

    // Previous url to navigate from 'About' page
    protected static previousUrl: string | null = null;

    // All existing classes
    protected static allClasses: Array<ClassModel> = PREDEFINED_CLASSES;

    // Global theme
    protected static applicationTheme: Themes = Themes.Dark;
}
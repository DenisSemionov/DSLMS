# DSLMS (Denis Semionov Learning Management System)
Client-side of simple learning management system. There is no server-side code and probably never will be, because it is a simple project for university.

=======
## Sample

This project is deployed on `https://ds-lms.firebaseapp.com`, so you can navigate and see sample yourself.

There is a possibility to login as:
    
    1. Content Manager - can access all pages.
        Login: `ContentManager`
        Password: any
    
    2. Learner - can acces only learning page.
        Login: `Learner`
        Password: any

## How to start

1. Add `127.0.0.1 ds-lms` as a host into host file.

2. Run `ng serve` or `npm start` for a dev server. Navigate to `http://ds-lms:4200/`. The app will automatically reload if you change any of the source files.

## Contribute

1. Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

2. Make a pull request.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help contact me via dennis.semionov@gmail.com e-mail.





## Firebase deploy
The problem is `firebase init` being unbelievably crude. It just overrides the `index.html` file that was in your `public` folder... no confirmation, no safety net, no nothing.

The only way to fix this is to re-produce your own `index.html` file.
If you do not have a backup of or other means of re-producing your `index.html` file... well... too bad!

Generally, the steps of a `firebase` setup with webpack (or other build tools) go a little like this:

 1. `firebase login`
 1. `firebase init`
 1. `your-build-command-here`
 1. `firebase deploy`
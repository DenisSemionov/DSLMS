import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainStore } from 'src/app/state/store/main-store';
import { NotificationService } from 'src/app/services/notification-service';
import { UserRoles } from 'src/app/types';
import { Router } from '@angular/router';
import { ApplicationStateManager } from 'src/app/state/managers/application-state-manager';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public hasForgotPassword = false;

    public loginForm: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        password: new FormControl('', [Validators.required, Validators.maxLength(50)])
    });

    constructor(
        private readonly _notificationService: NotificationService,
        private readonly _router: Router,
    ) { }

    public ngOnInit() {
        // Reset active user
        ApplicationStateManager.resetCurrentUser();
    }

    public login(): void {
        if (this.loginForm.invalid) {
            return;
        }

        switch ((this.loginForm.controls.username.value || '').trim()) {
            case UserRoles.ContentManager: {
                ApplicationStateManager.setCurrentUserRole(UserRoles.ContentManager);
                this._router.navigate(['content/management']);
                break;
            }

            case UserRoles.Learner: {
                ApplicationStateManager.setCurrentUserRole(UserRoles.Learner);
                this._router.navigate(['content/learning']);
                break;
            }

            default: {
                this._notificationService.error('Sorry to inform that provided credentials are invalid.');
                break;
            }
        }

    }

    public forgotPassword(): void {
        this.hasForgotPassword = true;
    }
}

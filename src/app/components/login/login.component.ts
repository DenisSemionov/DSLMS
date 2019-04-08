import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainStorage } from 'src/app/storage/main-storage';
import { NotificationService } from 'src/app/services/notification-service';
import { UserTypes } from 'src/app/types';
import { Router } from '@angular/router';

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
    }

    public login(): void {
        if (this.loginForm.invalid) {
            return;
        }

        switch ((this.loginForm.controls.username.value || '').trim()) {
            case UserTypes.ContentManager: {
                MainStorage.currentUser = UserTypes.ContentManager;
                this._router.navigate(['content/management']);
                break;
            }

            case UserTypes.Learner: {
                MainStorage.currentUser = UserTypes.Learner
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

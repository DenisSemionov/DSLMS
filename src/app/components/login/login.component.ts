import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

    constructor() { }

    public ngOnInit() {
    }

    public forgotPassword(): void {
        this.hasForgotPassword = true;
    }
}

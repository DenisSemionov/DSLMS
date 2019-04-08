import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatSnackBarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotificationService } from './services/notification-service';
import { ContentManagementComponent } from './components/content-management/content-management.component';
import { ContentPreviewComponent } from './components/content-preview/content-preview.component';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatMenuModule,
        MatSnackBarModule,
        MatButtonModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        FlexLayoutModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        ContentManagementComponent,
        ContentPreviewComponent,
    ],
    providers: [NotificationService],
    bootstrap: [AppComponent]
})
export class AppModule { }

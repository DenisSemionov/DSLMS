import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ContentManagementComponent } from './components/content-management/content-management.component';
import { ContentPreviewComponent } from './components/content-preview/content-preview.component';
import { AuthGuard } from './guards/auth.guard';
import { RouteNames } from './constants';
import { AboutComponent } from './components/about/about.component';

const secureRoutes: Routes = [
    {
        path: RouteNames.Management,
        component: ContentManagementComponent
    },
    {
        path: RouteNames.Learning,
        component: ContentPreviewComponent
    }
]

const routes: Routes = [
    {
        path: '',
        redirectTo: '/' + RouteNames.Login,
        pathMatch: 'full'
    },
    {
        path: RouteNames.Login,
        component: LoginComponent
    },
    {
        path: RouteNames.About,
        component: AboutComponent
    },
    {
        path: RouteNames.Content,
        pathMatch: 'prefix',
        children: secureRoutes,
        canActivateChild: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

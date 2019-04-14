import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ContentManagementComponent } from './components/content-management/content-management.component';
import { ContentPreviewComponent } from './components/content-preview/content-preview.component';
import { AuthGuard } from './guards/auth.guard';
import { ROUTE_NAMES } from './constants';
import { AboutComponent } from './components/about/about.component';

const secureRoutes: Routes = [
    {
        path: ROUTE_NAMES.Management,
        component: ContentManagementComponent
    },
    {
        path: ROUTE_NAMES.Learning,
        component: ContentPreviewComponent
    }
]

const routes: Routes = [
    {
        path: '',
        redirectTo: '/' + ROUTE_NAMES.Login,
        pathMatch: 'full'
    },
    {
        path: ROUTE_NAMES.Login,
        component: LoginComponent
    },
    {
        path: ROUTE_NAMES.About,
        component: AboutComponent
    },
    {
        path: ROUTE_NAMES.Content,
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

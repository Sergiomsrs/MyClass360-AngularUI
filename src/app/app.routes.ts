import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';

export const routes: Routes = [

    {
        path: '',
        component: LandingPageComponent,
    },
    {
        path: 'class',
        loadChildren: () => import('./classroom/classroom.routes')
    },
    {
        path: '**',
        redirectTo: ''
    }

];

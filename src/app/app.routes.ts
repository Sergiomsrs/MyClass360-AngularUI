import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { ClassroomLayoutComponent } from './classroom/layout/classroomLayout/classroomLayout.component';
import { WordSearchGeneratorComponent } from './resources/wordSearchGenerator/wordSearchGenerator.component';
import { ResourcesMenuComponent } from './classroom/components/resourcesMenu/resourcesMenu.component';

export const routes: Routes = [

    {
        path: '',
        component: LandingPageComponent,
    },
    {
        path: 'class',
        component: ClassroomLayoutComponent,
        children: [
            {
                path: 'letras',
                component: WordSearchGeneratorComponent
            },
            {
                path: 'selector',
                component: ResourcesMenuComponent
            },

        ]
    },
    {
        path: '**',
        redirectTo: '/class/objetivos'
    }

];

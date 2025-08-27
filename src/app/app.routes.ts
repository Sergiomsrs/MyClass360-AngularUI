import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { ClassroomLayoutComponent } from './classroom/layout/classroomLayout/classroomLayout.component';
import { ObjetivosUnidadesComponent } from './classroom/components/objetivosUnidades/objetivosUnidades.component';
import { FamiliaComponent } from './classroom/components/familia/familia.component';
import { OrientacionesComponent } from './classroom/components/orientaciones/orientaciones.component';
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
                path: 'objetivos',
                component: ObjetivosUnidadesComponent
            },
            {
                path: 'familia',
                component: FamiliaComponent
            },
            {
                path: 'orientaciones',
                component: OrientacionesComponent
            },
            {
                path: 'letras',
                component: WordSearchGeneratorComponent
            },
            {
                path: 'selector',
                component: ResourcesMenuComponent
            },
            { path: '', redirectTo: 'objetivos', pathMatch: 'full' },

        ]
    },
    {
        path: '**',
        redirectTo: '/class/objetivos'
    }

];

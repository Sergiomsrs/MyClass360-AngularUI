import { Routes } from "@angular/router";
import { ClassroomLayoutComponent } from "./layout/classroomLayout/classroomLayout.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { ObjetivosUnidadesComponent } from "./components/objetivosUnidades/objetivosUnidades.component";
import { FamiliaComponent } from "./components/familia/familia.component";
import { OrientacionesComponent } from "./components/orientaciones/orientaciones.component";



export const classroomRoutes: Routes = [
    {
        path: '',
        component: ClassroomLayoutComponent,
        children: [
            {
                path: "home",
                component: HomePageComponent,
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
                ]
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'home'
    }

]

export default classroomRoutes;
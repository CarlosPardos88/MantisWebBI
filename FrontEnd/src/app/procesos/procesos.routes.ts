import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProcesosComponent } from './procesos.component';
import { ProcesosFormComponent } from './form/form.component';
import { ProgramacionComponent } from './programacion/programacion.component';
import { ProgramacionFormComponent } from './programacion/form/form.component';

const routes: Routes = [{
    path: 'procesos',
    children: [{
        path: '',
        component: ProcesosComponent,
    }, {
        path: 'add',
        component: ProcesosFormComponent,
    }, {
        path: ':Id_Proceso/edit',
        component: ProcesosFormComponent,
    }, {
        path: ':Id_Proceso/:Nombre_Proceso/programacion',
        children: [{
            path: '',
            component: ProgramacionComponent,
        }, {
            path: ':Id_Proceso/:Nombre_Proceso/add',
            component: ProgramacionFormComponent,
        }, {
            path: ':Id_ProgramacionPeriodica/:Id_Proceso/:NombreProceso/edit',
            component: ProgramacionFormComponent,
        }],
    }],
}];

export const procesosRoutes: ModuleWithProviders = RouterModule.forChild(routes);

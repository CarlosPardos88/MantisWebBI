import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AprobacionesprogramadoComponent } from './aprobacionesprogramado.component';
import { AprobacionesFormComponent } from './form/form.component';

const routes: Routes = [{
    path: 'aprobacionesprogramado',
    children: [{
      path: '',
      component: AprobacionesprogramadoComponent,
    }, {
      path: ':Id_Proceso/:Id_ProgramacionPeriodica/:Nombre_AreaNegocio/:Fecha/edit',
      component: AprobacionesFormComponent,
    }],
}];

export const aprobacionRoutes: ModuleWithProviders = RouterModule.forChild(routes);

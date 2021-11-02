import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AprobacionesdemandaComponent } from './aprobacionesdemanda.component';
import { AprobacionesDemFormComponent } from './form/form.component';

const routes: Routes = [{
    path: 'aprobacionesdemanda',
    children: [{
      path: '',
      component: AprobacionesdemandaComponent,
    }, {
      path: ':Id_Proceso/:Id_SolicitudEjecucionPorDemanda/:Nombre_AreaNegocio/edit',
      component: AprobacionesDemFormComponent,
    }],
}];

export const aprobacionDemRoutes: ModuleWithProviders = RouterModule.forChild(routes);

import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EjecucionesComponent } from './ejecuciones.component';
import { EjecucionesFormComponent } from './form/form.component';
import { ReprogramacionprocesoComponent } from './reprogramacionproceso/reprogramacionproceso.component';

const routes: Routes = [{
  path: 'ejecuciones',
  children: [{
    path: '',
    component: EjecucionesComponent,
  }, 
  {
    path: ':Nombre_Proceso/:Fecha/:Nombre_AreaNegocio/edit',
    component: EjecucionesFormComponent,
  },

  {
    path: ':Nombre_Proceso/:Id_Proceso/:Id_EstadoProceso/reprogramar',
    component: ReprogramacionprocesoComponent,
  },
  
  {
    path: ':action',
    component: EjecucionesComponent,
  }],
}];

export const ejecucionesRoutes: ModuleWithProviders = RouterModule.forChild(routes);

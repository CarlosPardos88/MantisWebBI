import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuentesComponent } from './fuentes.component';
import { FuentesFormComponent } from './form/form.component';

const routes: Routes = [{
    path: 'fuentes',
    children: [{
      path: '',
      component: FuentesComponent,
    }, {
      path: 'add',
      component: FuentesFormComponent,
    }, {
      path: ':Id_SistemaFuente/edit',
      component: FuentesFormComponent,
    }],
}];

export const fuenteRoutes: ModuleWithProviders = RouterModule.forChild(routes);

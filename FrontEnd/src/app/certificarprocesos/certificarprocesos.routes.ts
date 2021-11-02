import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CertificarprocesosComponent } from './certificarprocesos.component';

const routes: Routes = [{
  path: 'certificarprocesos',
  children: [{
    path: '',
    component: CertificarprocesosComponent,
  },
  {
    path: ':action',
    component: CertificarprocesosComponent,
  }],
}];

export const certificarprocesosRoutes: ModuleWithProviders = RouterModule.forChild(routes);
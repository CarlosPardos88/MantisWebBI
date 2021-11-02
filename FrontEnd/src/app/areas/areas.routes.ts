import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AreasComponent } from './areas.component';
import { AreasFormComponent } from './form/form.component';

const routes: Routes = [{
    path: 'areas',
    children: [{
      path: '',
      component: AreasComponent,
    }, {
      path: 'add',
      component: AreasFormComponent,
    }, {
      path: ':Id_AreaNegocio/edit',
      component: AreasFormComponent,
    }],
}];

export const areaRoutes: ModuleWithProviders = RouterModule.forChild(routes);

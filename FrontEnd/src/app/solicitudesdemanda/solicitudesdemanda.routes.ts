import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SolicitudesdemandaComponent } from './solicitudesdemanda.component';
import { SolicitudesFormComponent } from './form/form.component';

const routes: Routes = [{
    path: 'solicitudesdemanda',
    children: [{
      path: '',
      component: SolicitudesdemandaComponent,
    }, {
        path: 'add',
        component: SolicitudesFormComponent,
    },
     {
      path: ':Id_Proceso/edit',
      component: SolicitudesFormComponent,
    }],
}];

export const solicitudesRoutes: ModuleWithProviders = RouterModule.forChild(routes);

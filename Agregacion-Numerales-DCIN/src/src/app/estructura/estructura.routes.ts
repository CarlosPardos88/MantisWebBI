import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EstructuraComponent } from './estructura.component';
import { EstructuraFormComponent } from './form/form.component';

const routes: Routes = [{
    path: '',
    children: [{
      path: '',
      component: EstructuraComponent,
    }, {
      path: 'add',
      component: EstructuraFormComponent,
    }, {
      path: ':Id_Estructura/:Desc_Estructura/edit',
      component: EstructuraFormComponent,
    }],
}];

export const estructuraRoutes: ModuleWithProviders = RouterModule.forChild(routes);

import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParametrosComponent } from './parametros.component';
import { ParametrosFormComponent } from './form/form.component';

const routes: Routes = [{
    path: 'parametros',
    children: [{
        path: '',
        component: ParametrosComponent,
    }, {
        path: 'add',
        component: ParametrosFormComponent,
    }, {
        path: ':id/edit',
        component: ParametrosFormComponent,
    }],
}];

export const parametrosRoutes: ModuleWithProviders = RouterModule.forChild(routes);

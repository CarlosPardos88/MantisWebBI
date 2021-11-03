import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';

import { ConsultasComponent } from './consultas.component';
import { ConsultasFormComponent} from './form/form.component';
import { ViewFormComponent} from './view-form/view-form.component';


const routes: Routes = [{
    path: '',
    children: [{
      path: '',
      component: ConsultasComponent,
    }, {
      path: 'add',
      component: ConsultasFormComponent,
    }, {
      path: ':Id_Estructura/:Sk_Consulta/View',
      component: ViewFormComponent,
    } ], 
}];

export const consultasRoutes: ModuleWithProviders = RouterModule.forChild(routes);

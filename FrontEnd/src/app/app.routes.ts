import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: 'login',
    //component: LoginComponent,
    children: [
      {
        component: LoginComponent,
        path: ':username',
      },    
    ],
  }, 
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        component: DashboardComponent,
        path: '',
      },
      { 
        path: '',
        loadChildren: './areas/areas.module#AreasModule',
      },
      { 
        path: '',
        loadChildren: './parametros/parametros.module#ParametrosModule',
      },
      { 
        path: '',
        loadChildren: './fuentes/fuentes.module#FuentesModule',
      },
      { 
        path: '',
        loadChildren: './procesos/procesos.module#ProcesosModule',
      },
      { 
        path: '',
        loadChildren: './ejecuciones/ejecuciones.module#EjecucionesModule',
      },
      { 
        path: '',
        loadChildren: './aprobacionesprogramado/aprobacionesprogramado.module#AprobacionesprogramadoModule',
      },
      { 
        path: '',
        loadChildren: './aprobacionesdemanda/aprobacionesdemanda.module#AprobacionesdemandaModule',
      },
      { 
        path: '',
        loadChildren: './solicitudesdemanda/solicitudesdemanda.module#SolicitudesdemandaModule',
      },
      { 
        path: '',
        loadChildren: './certificarprocesos/certificarprocesos.module#CertificarprocesosModule',
      },
    ],
  }
];

export const appRoutes: any = RouterModule.forRoot(routes, {useHash: true});

import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotificacionesComponent } from './notificaciones.component';


const routes: Routes = [{
    path: '../../procesos',
    children: [{
        path: ':Id_Proceso/:Nombre_Proceso/programacion',
        component: NotificacionesComponent
    },]
},
{
    path: '../../certificarprocesos',
    children: [{
        path: ':action',
        component: NotificacionesComponent
    }]
},
{
    path: '../../ejecuciones',
    children: [{
        path: ':action',
        component: NotificacionesComponent
    }]
},
{
    path: '../../aprobacionesdemanda',
    children: [{
        path: ':Id_Proceso/:Id_SolicitudEjecucionPorDemanda/:Nombre_AreaNegocio/edit',
        component: NotificacionesComponent,
    }],
},
{
    path: '../../aprobacionesprogramado',
    children: [{
        path: ':Id_Proceso/:Id_ProgramacionPeriodica/:Nombre_AreaNegocio/:Fecha/edit',
        component: NotificacionesComponent,
    }],
}]

export const NotificacionesRoutes: ModuleWithProviders = RouterModule.forChild(routes);

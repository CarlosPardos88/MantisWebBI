import { Provider, SkipSelf, Optional, InjectionToken } from '@angular/core';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';
import { Time } from '@angular/common';
import { MOCK_API } from '../config/api.config';


export interface IEjecuciones {
  Fecha: string;
  Id_ProgramacionPeriodica: number;
  Id_AprobacionProgramacionPeriodica: number;
  Id_SolicitudEjecucionPorDemanda: number;
  Id_Proceso: number;
  Nombre_Proceso: string;
  Hora_EjecucionProgramada: Time;
  Id_AreaNegocio: number;
  Nombre_AreaNegocio: string;
  Nombre_CarpetaWorkflows: string;
  Cb_Vencido: string;
  Cb_ProgramacionAprobada: string;
  Cb_ProcesoEjecutado: string;
  FechaHora_InicioEjecucion: Date;
  FechaHora_FinEjecucion: Date;
  Id_EstadoEjecucionInformatica: number;
  Nombre_EstadoEjecucionInformatica: string;
  Id_EstadoOperadorEjecucionProceso: number;
  Nombre_EstadoOperadorEjecucionProceso: string;
  Id_EstadoUsuarioEjecucionProceso: number;
  Nombre_EstadoUsuarioEjecucionProceso: string;
  Cb_Activo?: string
}

export class Ejecuciones {
  Fecha: string;
  Id_ProgramacionPeriodica: number;
  Id_AprobacionProgramacionPeriodica: number;
  Id_SolicitudEjecucionPorDemanda: number;
  Id_Proceso: number;
  Nombre_Proceso: string;
  Hora_EjecucionProgramada: Time;
  Id_AreaNegocio: number;
  Nombre_AreaNegocio: string;
  Nombre_CarpetaWorkflows: string;
  Cb_Vencido: string;
  Cb_ProgramacionAprobada: string;
  Cb_ProcesoEjecutado: string;
  FechaHora_InicioEjecucion: Date;
  FechaHora_FinEjecucion: Date;
  Id_EstadoEjecucionInformatica: number;
  Nombre_EstadoEjecucionInformatica: string;
  Id_EstadoOperadorEjecucionProceso: number;
  Nombre_EstadoOperadorEjecucionProceso: string;
  Id_EstadoUsuarioEjecucionProceso: number;
  Nombre_EstadoUsuarioEjecucionProceso: string;
}

const URL_BASE = MOCK_API + '/C_ProcesoProgramado';
@Injectable()
export class EjecucionesService extends RESTService<IEjecuciones> {

  constructor(private _http: HttpInterceptorService) {
    super(_http, {
      baseUrl: MOCK_API,
      path: 'C_ProcesoProgramado',
    });
  }

  ejecuciones: IEjecuciones;

  staticQuery(): Observable<IEjecuciones[]> {
    return this._http.get(URL_BASE)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
      );
  }

  getEjecucionesByArea(Fecha_incio: string, Fecha_fin: string, area: string): Observable<IEjecuciones[]> {
    return this._http.get(URL_BASE + '?Fecha_incio=' + Fecha_incio + '&Fecha_fin=' + Fecha_fin + '&area=' + area)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
      );
  }

  getEjecuciones(Fecha_incio: string, Fecha_fin: string): Observable<IEjecuciones[]> {
    return this._http.get(URL_BASE + '?Fecha_incio=' + Fecha_incio + '&Fecha_fin=' + Fecha_fin)
      .pipe(
        map((res: Response) => {
          console.log('Ver retorno de JSON getEjecuciones: ', res.json());
          return res.json();
        }),
      );
  }

  getAprobacionProgramada(Fecha_incio: string, Fecha_fin: string): Observable<IEjecuciones[]> {
    return this._http.get(URL_BASE + '?Fecha_incioap=' + Fecha_incio + '&Fecha_finap=' + Fecha_fin)
      .pipe(
        map((res: Response) => {
          console.log('Ver retorno de JSON getAprobacionProgramada: ', res.json());
          return res.json();
        }),
      );
  }

  getAprobacionProgramadaDem(Fecha_incio: string, Fecha_fin: string): Observable<IEjecuciones[]> {
    console.log(URL_BASE + '?Fecha_incioapd=' + Fecha_incio + '&Fecha_finapd=' + Fecha_fin);
    return this._http.get(URL_BASE + '?Fecha_incioapd=' + Fecha_incio + '&Fecha_finapd=' + Fecha_fin)
      .pipe(
        map((res: Response) => {
          console.log('Ver retorno de JSON getAprobacionProgramadaDem: ', res.json());
          return res.json();
        }),
      );
  }

  getProPreByProceso(IdProceso: number): Observable<IEjecuciones[]> {
    let url = URL_BASE + '/?IdProceso=' + IdProceso
    return this._http.get(url)
      .pipe(
        map((res: Response) => {
          console.log('Ver retorno de JSON getProPreByProceso: ', res.json());
          return res.json();
        }),
      );
  }

}

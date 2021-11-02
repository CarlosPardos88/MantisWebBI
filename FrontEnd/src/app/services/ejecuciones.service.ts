import { Provider, SkipSelf, Optional, InjectionToken } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';
import { Time } from '@angular/common';
import { MOCK_API } from '../../config/api.config';


export interface IEjecuciones {
  Fecha: string;
  Id_ProgramacionPeriodica : number;
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
  Id_EstadoUsuarioEjecucionProceso : number;
  Nombre_EstadoUsuarioEjecucionProceso: string;
}

const URL_BASE = MOCK_API+'/C_ProcesoProgramado';

export class EjecucionesService extends RESTService<IEjecuciones> {

  constructor(private _http: HttpInterceptorService, api: string) {
    super(_http, {
      baseUrl: api,
      path: '/C_ProcesoProgramado',
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

  getEjecuciones(Fecha_incio : string, Fecha_fin : string): Observable<IEjecuciones[]>{
    return this._http.get(URL_BASE + '?Fecha_incio=' + Fecha_incio + '&Fecha_fin=' +Fecha_fin)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  getAprobacionProgramada(Fecha_incio : string, Fecha_fin : string): Observable<IEjecuciones[]>{
    return this._http.get(URL_BASE + '?Fecha_incioap=' + Fecha_incio + '&Fecha_finap=' +Fecha_fin)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  getAprobacionProgramadaDem(Fecha_incio : string, Fecha_fin : string): Observable<IEjecuciones[]>{
    return this._http.get(URL_BASE + '?Fecha_incioapd=' + Fecha_incio + '&Fecha_finapd=' +Fecha_fin)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  getProPreByProceso(IdProceso: number): Observable<IEjecuciones[]> {
    let url = URL_BASE + '/?IdProceso=' + IdProceso
    return this._http.get(url)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }
  
}

export const EJECUCIONES_API: InjectionToken<string> = new InjectionToken<string>('EJECUCIONES_API');

export function EJECUCIONES_PROVIDER_FACTORY(
    parent: EjecucionesService, interceptorHttp: HttpInterceptorService, api: string): EjecucionesService {
  return parent || new EjecucionesService(interceptorHttp, api);
}

export const EJECUCIONES_PROVIDER: Provider = {
  // If there is already a service available, use that. Otherwise, provide a new one.
  provide: EjecucionesService,
  deps: [[new Optional(), new SkipSelf(), EjecucionesService], HttpInterceptorService, EJECUCIONES_API],
  useFactory: EJECUCIONES_PROVIDER_FACTORY,
};

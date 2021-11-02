import { Provider, SkipSelf, Optional, InjectionToken } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';
import { Time } from '@angular/common';
import { MOCK_API } from '../../../config/api.config';

export interface ICertificar {
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
  Id_ResultadoEjecucionProgramada: number;
  }

const URL_BASE = MOCK_API+'/C_ProcesoProgramado';

export class CertificarprocesosService  extends RESTService<ICertificar> {

  constructor(private _http: HttpInterceptorService, api: string) {
    super(_http, {
      baseUrl: api,
      path: '/C_ProcesoProgramado',
    });
  }

  ejecuciones: ICertificar;
  
  getEjecuciones(Rol: string): Observable<ICertificar[]>{
    return this._http.get(URL_BASE + '?Rol='+ Rol )
    .pipe(
      map((res: Response) => {
        console.log('Impresion getEjeciones 1');
        console.log(res.json());
        return res.json();
      }),
    );
  }

  getEjecucionesByArea(Rol: string, area:string): Observable<ICertificar[]>{
    return this._http.get(URL_BASE + '?Rol='+ Rol + '&area=' + area )
    .pipe(
      map((res: Response) => {
        console.log('Impresion getEjecionesByArea');
        console.log(res.json());
        return res.json();
      }),
    );
  }

  getejecutado(Id_Proceso: number): Observable<ICertificar[]>{
    return this._http.get(URL_BASE + '?idpr=' + Id_Proceso)
    .pipe(
      map((res: Response) => {
        console.log('Impresion getEjecutado');
        console.log(res.json());
        return res.json();
      }),
    );
  }

}

export const CERTIFICAR_API: InjectionToken<string> = new InjectionToken<string>('CERTIFICAR_API');

export function CERTIFICAR_PROVIDER_FACTORY(
    parent: CertificarprocesosService, interceptorHttp: HttpInterceptorService, api: string): CertificarprocesosService {
  return parent || new CertificarprocesosService(interceptorHttp, api);
}

export const CERTIFICAR_PROVIDER: Provider = {
  // If there is already a service available, use that. Otherwise, provide a new one.
  provide: CertificarprocesosService,
  deps: [[new Optional(), new SkipSelf(), CertificarprocesosService], HttpInterceptorService, CERTIFICAR_API],
  useFactory: CERTIFICAR_PROVIDER_FACTORY,
};

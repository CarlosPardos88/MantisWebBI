import { Provider, SkipSelf, Optional, InjectionToken } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';
import { MOCK_API } from '../../../config/api.config';


export interface IAprobacion {
  Id_ProgramacionPeriodica: number;
  FechaHora_RevisionOperador: string;
  Id_AprobacionProgramacionPeriodica: number;
  Nombre_OperadorRevisor: string;
  Nombre_RolOperadorRevisor: string;
  Fecha_EjecucionAprobada: String;
}

const URL_BASE = MOCK_API+'/OPE_AprobacionProgramacionPeriodicaProceso';

export class AprobacionesprogramadoService extends RESTService<IAprobacion> {

  constructor(private _http: HttpInterceptorService, api: string) {
    super(_http, {
      baseUrl: api,
      path: '/OPE_AprobacionProgramacionPeriodicaProceso',
    });
  }

  aprobacion: IAprobacion;

  staticQuery(): Observable<IAprobacion[]> {
    return this._http.get(URL_BASE)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  postCreateAprobacion(aprobacion : IAprobacion){
    return this._http.post(URL_BASE,aprobacion)
    .pipe(
      map((res: Response) => {
        return res.json;
      }
      ));
  }
  
}

export const APROBACIONES_API: InjectionToken<string> = new InjectionToken<string>('APROBACIONES_API');

export function APROBACION_PROVIDER_FACTORY(
    parent: AprobacionesprogramadoService, interceptorHttp: HttpInterceptorService, api: string): AprobacionesprogramadoService {
  return parent || new AprobacionesprogramadoService(interceptorHttp, api);
}

export const APROBACION_PROVIDER: Provider = {
  // If there is already a service available, use that. Otherwise, provide a new one.
  provide: AprobacionesprogramadoService,
  deps: [[new Optional(), new SkipSelf(), AprobacionesprogramadoService], HttpInterceptorService, APROBACIONES_API],
  useFactory: APROBACION_PROVIDER_FACTORY,
};

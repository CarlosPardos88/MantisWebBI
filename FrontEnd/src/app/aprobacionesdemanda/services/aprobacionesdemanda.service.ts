import { Provider, SkipSelf, Optional, InjectionToken } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';
import { MOCK_API } from '../../../config/api.config';


export interface IAprobacionDem {
  Id_SolicitudEjecucionPorDemanda: number;
  FechaHora_FinVentanaSugerida: string;
  FechaHora_EjecucionAprobada: string;
  Id_Proceso: number;
  FechaHora_InicioVentanaSugerida: string;
  FechaHora_Sugerida: String;
  FechaHora_RevisionUsuario: string;
  FechaHora_RevisionOperador: string;
  //FechaHora_RevisionUsuario: Date;
  //FechaHora_RevisionOperador: Date;
  Nombre_OperadorRevisor: string;
  Nombre_RolOperadorRevisor: string;
  Nombre_UsuarioSolicitante: string;
  Nombre_RolUsuarioSolicitante: string;
  Cb_Activo?: string;
  Desc_JustificacionSolicitud?: string;
  Id_TipoEjecucionDemanda?: string;
}

const URL_BASE = MOCK_API + '/OPE_SolicitudEjecucionPorDemandaProceso';

export class AprobacionesdemandaService extends RESTService<IAprobacionDem> {

  constructor(private _http: HttpInterceptorService, api: string) {
    super(_http, {
      baseUrl: api,
      path: '/OPE_SolicitudEjecucionPorDemandaProceso',
    });
  }

  aprobacionDem: IAprobacionDem;

  staticQuery(): Observable<IAprobacionDem[]> {
    return this._http.get(URL_BASE)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
      );
  }

  putAprobacionDem(Id_SolicitudEjecucionPorDemanda: number, aprobacionDem: IAprobacionDem) {
    return this._http.put(URL_BASE + '/' + Id_SolicitudEjecucionPorDemanda, aprobacionDem)
      .pipe(
        map((res: Response) => {
          return res.json;
        }
        ));
  }

}

export const APROBACIONESDEM_API: InjectionToken<string> = new InjectionToken<string>('APROBACIONESDEM_API');

export function APROBACIONDEM_PROVIDER_FACTORY(
  parent: AprobacionesdemandaService, interceptorHttp: HttpInterceptorService, api: string): AprobacionesdemandaService {
  return parent || new AprobacionesdemandaService(interceptorHttp, api);
}

export const APROBACIONDEM_PROVIDER: Provider = {
  // If there is already a service available, use that. Otherwise, provide a new one.
  provide: AprobacionesdemandaService,
  deps: [[new Optional(), new SkipSelf(), AprobacionesdemandaService], HttpInterceptorService, APROBACIONESDEM_API],
  useFactory: APROBACIONDEM_PROVIDER_FACTORY,
};

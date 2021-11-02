import { Provider, SkipSelf, Optional, InjectionToken } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';
import { MOCK_API } from '../../../config/api.config';


export interface ISolicitudDem {
  Id_SolicitudEjecucionPorDemanda: number;
  FechaHora_FinVentanaSugerida: string;
  FechaHora_EjecucionAprobada: string;
  Id_Proceso: number;
  FechaHora_InicioVentanaSugerida: string;
  FechaHora_Sugerida: String;
  FechaHora_RevisionUsuario: string;
  FechaHora_RevisionOperador: string;
  Nombre_OperadorRevisor: string;
  Nombre_RolOperadorRevisor: string;
  Nombre_UsuarioSolicitante: string;
  Nombre_RolUsuarioSolicitante: string;
  Cb_Activo?: string;
  Desc_JustificacionSolicitud: string;
  Id_TipoEjecucionDemanda: string;
  Nombre_AreaNegocio: string;
}

const URL_BASE = MOCK_API + '/OPE_SolicitudEjecucionPorDemandaProceso';

export class SolicitudesdemandaService extends RESTService<ISolicitudDem> {

  constructor(private _http: HttpInterceptorService, api: string) {
    super(_http, {
      baseUrl: api,
      path: '/OPE_SolicitudEjecucionPorDemandaProceso',
    });
  }

  solicitudDem: ISolicitudDem;

  staticQuery(): Observable<ISolicitudDem[]> {
    return this._http.get(URL_BASE)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
      );
  }

  postCreateSolicitudDemanda(solicitudDem: ISolicitudDem) {
    return this._http.post(URL_BASE, solicitudDem)
      .pipe(
        map((res: Response) => {
          return res.json;
        }
        ));
  }

  getSolicitudesByProceso(Id_Proceso: number): Observable<ISolicitudDem[]> {
    return this._http.get(URL_BASE + '?id_proceso=' + Id_Proceso)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
      );
  }

  putSolicitudes(id: number, solicitud: ISolicitudDem) {
    return this._http.put(URL_BASE + '/' + id, solicitud)
      .pipe(
        map((res: Response) => {
          return res.json;
        }
        ));
  }

}

export const SOLICITUDESDEM_API: InjectionToken<string> = new InjectionToken<string>('SOLICITUDESDEM_API');

export function SOLICITUDDEM_PROVIDER_FACTORY(
  parent: SolicitudesdemandaService, interceptorHttp: HttpInterceptorService, api: string): SolicitudesdemandaService {
  return parent || new SolicitudesdemandaService(interceptorHttp, api);
}

export const SOLICITUDDEM_PROVIDER: Provider = {
  // If there is already a service available, use that. Otherwise, provide a new one.
  provide: SolicitudesdemandaService,
  deps: [[new Optional(), new SkipSelf(), SolicitudesdemandaService], HttpInterceptorService, SOLICITUDESDEM_API],
  useFactory: SOLICITUDDEM_PROVIDER_FACTORY,
};

import { Provider, SkipSelf, Optional, InjectionToken  } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';

import { ITipoFuente, TipoFuente } from '../../../services/tiposisfuente.service';
import { IHorarioSF, HorarioSF } from '../../../services/horariosf.service';
import { MOCK_API } from '../../../config/api.config';
import { Time } from '@angular/common';

export interface IFuente{
  Id_SistemaFuente: number;
  Nombre_SistemaFuente: string;
  Id_TipoSistemaFuente: number;
  Nombre_TipoSistemaFuente?: string;
  Hora_Inicio?: Time;
  Hora_Fin?:Time;
  OPE_TipoSistemaFuente: ITipoFuente;
  OPE_HorarioSistemaFuente: IHorarioSF[];
  OPE_HorarioSistemaFuenteold: IHorarioSF[];
  
}

export class Fuente{
  Id_SistemaFuente: number;
  Nombre_SistemaFuente: string;
  Id_TipoSistemaFuente: number;
  Nombre_TipoSistemaFuente?: string = undefined;
  Hora_Inicio: Time;
  Hora_Fin:Time;
  OPE_TipoSistemaFuente: TipoFuente;
  OPE_HorarioSistemaFuente: HorarioSF;
  OPE_HorarioSistemaFuenteold: IHorarioSF[];
}

const URL_BASE = MOCK_API+'/OPE_SistemaFuente';

export class FuentesService extends RESTService<IFuente> {

  constructor(private _http: HttpInterceptorService, api: string, ) 
  { 
    super(_http, {
      baseUrl: api,
      path: '/OPE_SistemaFuente',
    });
  }

  fuente: IFuente;

  staticQuery(): Observable<IFuente[]> {
    return this._http.get(URL_BASE)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  staticQueryIdProceso(idProceso): Observable<IFuente[]> {
    return this._http.get(URL_BASE + '/GetIdProceso?idProceso=' + idProceso)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  postCreateFuente(fuente : IFuente){
    return this._http.post(URL_BASE,fuente)
    .pipe(
      map((res: Response) => {
        return res.json;
      }
      ));
  }

  putFuente(Id_SistemaFuente : number, fuente : IFuente){
    return this._http.put(URL_BASE + '/' + Id_SistemaFuente,fuente)
    .pipe(
      map((res: Response) => {
        return res.json;
      }
    )); 
  }

  deleteFuente(Id_SistemaFuente : number){
    return this._http.delete(URL_BASE + '/' + Id_SistemaFuente);
  }

}

export const FUENTES_API: InjectionToken<string> = new InjectionToken<string>('FUENTES_API');

export function FUENTE_PROVIDER_FACTORY(
    parent: FuentesService, interceptorHttp: HttpInterceptorService, api: string): FuentesService {
  return parent || new FuentesService(interceptorHttp, api);
}

export const FUENTE_PROVIDER: Provider = {
  // If there is already a service available, use that. Otherwise, provide a new one.
  provide: FuentesService,
  deps: [[new Optional(), new SkipSelf(), FuentesService], HttpInterceptorService, FUENTES_API],
  useFactory: FUENTE_PROVIDER_FACTORY,
};

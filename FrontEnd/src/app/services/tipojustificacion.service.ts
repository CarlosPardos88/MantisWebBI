import { Injectable } from '@angular/core';
import { Provider, SkipSelf, Optional, InjectionToken } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';
import { MOCK_API } from '../../config/api.config';


export interface ITipoJustificacion {
  Id_TipoEjecucionDemanda: number;
  Nombre_TipoEjecucionDemanda: string;

}

const URL_BASE = MOCK_API + '/OPE_TipoEjecucionDemanda';

export class TipojustificacionService extends RESTService<ITipoJustificacion>  {



  constructor(private _http: HttpInterceptorService, api: string) {
    super(_http, {
      baseUrl: api,
      path: '/OPE_TipoEjecucionDemanda',
    });
  }

  staticQuery(): Observable<ITipoJustificacion[]> {
    return this._http.get(URL_BASE)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
      );
  }

  LocalData(): Observable<ITipoJustificacion[]> {
    return this._http.get('data/tipojustificacion.json').pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

}

export const TIPOJUSTIFICACION_API: InjectionToken<string> = new InjectionToken<string>('TIPOJUSTIFICACION_API');

export function TIPOJUSTIFICACION_PROVIDER_FACTORY(
  parent: TipojustificacionService, interceptorHttp: HttpInterceptorService, api: string): TipojustificacionService {
  return parent || new TipojustificacionService(interceptorHttp, api);
}

export const TIPOJUSTIFICACION_PROVIDER: Provider = {
  // If there is already a service available, use that. Otherwise, provide a new one.
  provide: TipojustificacionService,
  deps: [[new Optional(), new SkipSelf(), TipojustificacionService], HttpInterceptorService, TIPOJUSTIFICACION_API],
  useFactory: TIPOJUSTIFICACION_PROVIDER_FACTORY,
};

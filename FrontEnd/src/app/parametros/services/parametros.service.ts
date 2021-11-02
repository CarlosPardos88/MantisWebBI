import { Provider, SkipSelf, Optional, InjectionToken } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';
import { MOCK_API } from '../../../config/api.config';

export interface IParametro {
  Id_Parametro: number;
  NombreGrupoParametro: string;
  NombreParametro: string;
  ValorParametro: string;
  DescripcionParametro: string;
  FechaCreacion: Date;
  FechaModificacion: Date;
}

export class Parametro {
  Id_Parametro: number;
  NombreGrupoParametro: string;
  NombreParametro: string;
  ValorParametro: string;
  DescripcionParametro: string;
  FechaCreacion: Date;
  FechaModificacion: Date;
}

const URL_BASE = MOCK_API+'/OPE_Tp_Parametros';


export class ParametroService extends RESTService<IParametro> {


  constructor(private _http: HttpInterceptorService, api: string) {
    super(_http, {
      baseUrl: api,
      path: '/OPE_Tp_Parametros',
    });
  }

  staticQuery(): Observable<IParametro[]> {
    return this._http.get(URL_BASE)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
      );
  }

  staticQueryArea(area: string): Observable<IParametro[]> {
   
    return this._http.get(URL_BASE + '?area=' + area)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
      );
  }

  add(parametro: IParametro): Observable<any> {
    return this._http.post(URL_BASE, parametro)
      .pipe(
        map((res: Response) => {
          return res.json;
        }
        ));
  }

  edit(parametro: IParametro): Observable<any> {
    return this._http.put(URL_BASE, parametro)
      .pipe(
        map((res: Response) => {
          return res.json;
        }
        ));
  }

  getParametro(idParametro: number): Observable<any> {
    let url = URL_BASE + '/' + idParametro + '';

    return this._http.get(url)
      .pipe(
        map((res: any) => {
          return JSON.parse(res._body);
        }
        ));
  }
}

export const PARAMETROS_API: InjectionToken<string> = new InjectionToken<string>('PARAMETROS_API');

export function PARAMETRO_PROVIDER_FACTORY(
  parent: ParametroService, interceptorHttp: HttpInterceptorService, api: string): ParametroService {
  return parent || new ParametroService(interceptorHttp, api);
}

export const PARAMETRO_PROVIDER: Provider = {
  // If there is already a service available, use that. Otherwise, provide a new one.
  provide: ParametroService,
  deps: [[new Optional(), new SkipSelf(), ParametroService], HttpInterceptorService, PARAMETROS_API],
  useFactory: PARAMETRO_PROVIDER_FACTORY,
};

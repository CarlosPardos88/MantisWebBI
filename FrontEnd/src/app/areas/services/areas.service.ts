import { Provider, SkipSelf, Optional, InjectionToken } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';
import { MOCK_API } from '../../../config/api.config';
import { HttpHeaders } from '@angular/common/http';


export interface IArea {
  Id_AreaNegocio: number;
  Nombre_AreaNegocio: string;
  Desc_AreaNegocio: string;
  Nombre_CarpetaWorkflows: string;
  Num_InicioRangoCodProceso: number;
  Num_FinRangoCodProceso: number;
}

export class Area {
  Id_AreaNegocio: number;
  Nombre_AreaNegocio: string;
  Desc_AreaNegocio: string;
  Nombre_CarpetaWorkflows: string;
  Num_InicioRangoCodProceso: number;
  Num_FinRangoCodProceso: number;
}

const URL_BASE = MOCK_API+'/OPE_AreaNegocio';

export class AreasService extends RESTService<IArea> {

  constructor(private _http: HttpInterceptorService, api: string) {
    super(_http, {
      baseUrl: api,
      path: '/OPE_AreaNegocio',
    });
  }
  
  area: IArea;

  staticQuery(): Observable<IArea[]> {
    return this._http.get(URL_BASE)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  postCreateArea(area : IArea){
    return this._http.post(URL_BASE,area )
    .pipe(
      map((res: Response) => {
        return res.json;
      }
      ));
  }

  putArea(Id_AreaNegocio : number, area : IArea){
    return this._http.put(URL_BASE + '/' + Id_AreaNegocio,area)
    .pipe(
      map((res: Response) => {
        return res.json;
      }
    )); 
  }

  deleteArea(Id_AreaNegocio : number){
    return this._http.delete(URL_BASE + '/' + Id_AreaNegocio);
  }
  
}

export const AREAS_API: InjectionToken<string> = new InjectionToken<string>('AREAS_API');

export function AREA_PROVIDER_FACTORY(
    parent: AreasService, interceptorHttp: HttpInterceptorService, api: string): AreasService {
  return parent || new AreasService(interceptorHttp, api);
}

export const AREA_PROVIDER: Provider = {
  // If there is already a service available, use that. Otherwise, provide a new one.
  provide: AreasService,
  deps: [[new Optional(), new SkipSelf(), AreasService], HttpInterceptorService, AREAS_API],
  useFactory: AREA_PROVIDER_FACTORY,
};

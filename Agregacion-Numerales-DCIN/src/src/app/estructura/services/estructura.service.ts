import { Injectable, InjectionToken, Provider, SkipSelf, Optional } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient, HttpInterceptor } from '@angular/common/http';
import { MOCK_API } from 'src/config/api.config';
import { ITdHttpInterceptor } from '@covalent/http';

import {
  mixinHttp,
} from '@covalent/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IEstructura {
  Id_Estructura: number;
  Desc_Estructura: string;
  Fecha_InicioVigencia : Date;
  Fecha_FinVigencia : Date;
  Cb_EsDefinitiva: string;
  Nombre_UsuarioCreacion: string;
  Fecha_Creacion: string;
  Cb_Eliminado: string;
  Nombre_UsuarioEliminacion: string;
  Nodos: any[];
}

export class Estructura {
  Id_Estructura: number;
  Desc_Estructura: string;
  Fecha_InicioVigencia : Date;
  Fecha_FinVigencia : Date;
  Cb_EsDefinitiva: string;
  Nombre_UsuarioCreacion: string;
  Fecha_Creacion: string;
  Cb_Eliminado: string;
  Nombre_UsuarioEliminacion: string;
}

const URL_BASE = MOCK_API+'/RC_EstructuraAgregacionNumerales';

@Injectable({
  providedIn: 'root'
})

export class EstructuraService extends mixinHttp(class {
  list : IEstructura[];
}, {

baseUrl: MOCK_API,
baseHeaders: new HttpHeaders({ 'Accept': 'application/json' }),
}, HttpClient) { 
  
  constructor(private http: HttpClient){
    super(http, {
      baseUrl: MOCK_API,
      path: '/RC_EstructuraAgregacionNumerales',
    });
  }

  getEstructuras(): Observable<any> {
    return this.http.get(URL_BASE).pipe(
      map((res: Response) => {
        return res;
      }),
    );
  }

  getEstructuraByIdName(Id_Estructura : number, Desc_Estructura: string): Observable<IEstructura[]> {
    return this.http.get(URL_BASE + '?Id_Estructura=' + Id_Estructura + '&Desc_Estructura=' +Desc_Estructura)
    .pipe(
      map((res: IEstructura[]) => {
        return res;
      }),
    );
  }

  postCreateEstructura(estructura : IEstructura){
    return this.http.post(URL_BASE,estructura)
    .pipe(
      map((res: Response) => {
        return res.json;
      }
      ));
  }

  putUpdateEstructura(Id_Estructura : number, estructura : IEstructura){
    return this.http.put(URL_BASE + '/' + Id_Estructura, estructura)
    .pipe(
      map((res: Response) => {
        return res.json;
      }
    )); 
  }
}


export const ESTRUCTURA_API: InjectionToken<string> = new InjectionToken<string>('ESTRUCTURA_API');

export function ESTRUCTURA_PROVIDER_FACTORY(
    parent: EstructuraService, interceptorHttp: HttpClient, api: string): EstructuraService {
  return parent || new EstructuraService(interceptorHttp);
}

export const ESTRUCTURA_PROVIDER: Provider = {
  // If there is already a service available, use that. Otherwise, provide a new one.
  provide: EstructuraService,
  deps: [[new Optional(), new SkipSelf(), EstructuraService], HttpClient, ESTRUCTURA_API],
  useFactory: ESTRUCTURA_PROVIDER_FACTORY,
};
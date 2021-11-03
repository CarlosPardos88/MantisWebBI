import { Injectable, InjectionToken, Provider, SkipSelf, Optional } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient, HttpInterceptor } from '@angular/common/http';
import { MOCK_API } from 'src/config/api.config';
import { mixinHttp } from '@covalent/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IResultado{
  Sk_Consulta: number;
  Id_Estructura: number;
  Fecha_Consulta: Date;
  Fecha_DeclaracionInicial: Date;
  Sk_NodoContable: number;
  Id_NodoContable: number;
  Desc_NodoContable: string;
  Cv_ValorUSD: number;
  Cuts: any;
}

export class Resultado{
  Sk_Consulta: number;
  Id_Estructura: number;
  Fecha_Consulta: Date;
  Fecha_DeclaracionInicial: Date;
  Sk_NodoContable: number;
  Id_NodoContable: number;
  Desc_NodoContable: string;
  Cv_ValorUSD: number;
}

const URL_BASE = MOCK_API+'/RC_ResultadoAgregacionNumerales';
@Injectable({ providedIn: 'root' })
export class ResultadosService extends mixinHttp(class {
  list : IResultado[];
}, {

baseUrl: MOCK_API,
baseHeaders: new HttpHeaders({ 'Accept': 'application/json' }),
}, HttpClient) { 
  
  constructor(private http: HttpClient){
    super(http, {
      baseUrl: MOCK_API,
      path: '/RC_ResultadoAgregacionNumerales',
    });
  }

  getResultadoAgregacionById(Id_Estructura: number): Observable<IResultado[]> {
    return this.http.get(URL_BASE+ `?Id_Estructura={Id_Estructura}`).pipe(
      map((res: IResultado[]) => {
        return res;
      }),
    );
  }  
}



export const RESULTADOAGREGACION_API: InjectionToken<string> = new InjectionToken<string>('RESULTADOAGREGACION_API');

export function RESULTADOAGREGACION_PROVIDER_FACTORY(
    parent: ResultadosService, interceptorHttp: HttpClient, api: string): ResultadosService {
  return parent || new ResultadosService(interceptorHttp);
}

export const RESULTADOAGREGACION_PROVIDER: Provider = {
  // If there is already a service available, use that. Otherwise, provide a new one.
  provide: ResultadosService,
  deps: [[new Optional(), new SkipSelf(), ResultadosService], HttpClient, RESULTADOAGREGACION_API],
  useFactory: RESULTADOAGREGACION_PROVIDER_FACTORY,
};
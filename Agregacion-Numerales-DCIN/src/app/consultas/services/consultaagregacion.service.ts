import { Injectable, InjectionToken, Provider, SkipSelf, Optional } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient, HttpInterceptor } from '@angular/common/http';
import { MOCK_API } from 'src/config/api.config';
import { ITdHttpInterceptor } from '@covalent/http';

import {
  mixinHttp,
} from '@covalent/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IConsulta{
  Sk_Consulta: number;
  Id_Estructura: number;
  Desc_Estructura: string;
  Fecha_Consulta: Date;
  Id_Fuente: number;
  Desc_Fuente: string;
  Fecha_Inicial: Date;
  Fecha_Final: Date;
  Id_Periodicidad: number;
  Desc_Periodicidad: string;
  Nombre_UsuarioCreacion: string;
}

export class Consulta{
  Sk_Consulta: number;
  Id_Estructura: number;
  Desc_Estructura: string;
  Fecha_Consulta: Date;
  Id_Fuente: number;
  Desc_Fuente: string;
  Fecha_Inicial: Date;
  Fecha_Final: Date;
  Id_Periodicidad: number;
  Desc_Periodicidad: string;
  Nombre_UsuarioCreacion: string;
  
}


const URL_BASE = MOCK_API+'/RC_ConsultaAgregacionNumerales';
@Injectable({
  providedIn: 'root'
})


export class ConsultaagregacionService extends mixinHttp(class {
  list : IConsulta[];
}, {

baseUrl: MOCK_API,
baseHeaders: new HttpHeaders({ 'Accept': 'application/json' }),
}, HttpClient) { 
  
  constructor(private http: HttpClient){
    super(http, {
      baseUrl: MOCK_API,
      path: '/RC_ConsultaAgregacionNumerales',
    });
  }

  getConsultaAgregacion(): Observable<any> {
    return this.http.get(URL_BASE).pipe(
      map((res: Response) => {
        return res;
      }),
    );
  }

  getConsultaAgregacionBySk(Id_Estructura: number, Sk_Consulta: number): Observable<IConsulta[]> {
    
    return this.http.get(URL_BASE+ '?Id_Estructura='+Id_Estructura+ '&Sk_Consulta='+Sk_Consulta).pipe(
      map((res: IConsulta[]) => {
        return res;
      }),
    );
  }

 
  postCreateConsulta(consulta: IConsulta) {
    return this.http.post(URL_BASE, consulta)
      .pipe(
        map((res: number) => {
          return res;
        }
        ));
  }

  getSkConsultas(Id_Estructura: number, Fecha_Consulta: String, Id_Fuente: number, Fecha_Inicial: String, Fecha_Final: String, Id_Periodicidad: number ) {
    return this.http.get(URL_BASE+ '?Id_Estructura='+ Id_Estructura+ '&Fecha_Consulta='+Fecha_Consulta+ '&Id_Fuente='+Id_Fuente+ '&Fecha_Inicial='+Fecha_Inicial+ '&Fecha_Final='+Fecha_Final+'&Id_Periodicidad='+Id_Periodicidad)
      .pipe(
        map((res: number) => {
          return res;
        }
        ));
  }
}



export const CONSULTAAGREGACION_API: InjectionToken<string> = new InjectionToken<string>('CONSULTAAGREGACION_API');

export function CONSULTAAGREGACION_PROVIDER_FACTORY(
    parent: ConsultaagregacionService, interceptorHttp: HttpClient, api: string): ConsultaagregacionService {
  return parent || new ConsultaagregacionService(interceptorHttp);
}

export const CONSULTAAGREGACION_PROVIDER: Provider = {
  // If there is already a service available, use that. Otherwise, provide a new one.
  provide: ConsultaagregacionService,
  deps: [[new Optional(), new SkipSelf(), ConsultaagregacionService], HttpClient, CONSULTAAGREGACION_API],
  useFactory: CONSULTAAGREGACION_PROVIDER_FACTORY,
};
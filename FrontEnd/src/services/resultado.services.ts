import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { MOCK_API } from '../config/api.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';
import { Time } from '@angular/common';
import { HttpEvent, HttpRequest } from '@angular/common/http';

export interface IResultado{
    FechaHora_InicioEjecucion: Date;
    FechaHora_FinEjecucion: Date;
    Id_ResultadoEjecucionProgramada: number;
    Id_SolicitudEjecucionPorDemanda: number;
    Id_AprobacionProgramacionPeriodica: number;
    FechaHora_RevisionOperador: Date;
    FechaHora_RevisionUsuario: Date;
    Id_EstadoOperadorEjecucionProceso: number;
    Id_EstadoUsuarioEjecucionProceso: number;
    Id_EstadoEjecucionInformatica: number;
    Nombre_UsuarioRevisor: string;
    Nombre_OperadorRevisor: string;
    Nombre_RolUsuarioRevisor: string;
    Nombre_RolOperadorRevisor: string;
}

export class Resultado{
  FechaHora_InicioEjecucion: Date;
  FechaHora_FinEjecucion: Date;
  Id_ResultadoEjecucionProgramada: number;
  Id_SolicitudEjecucionPorDemanda: number;
  Id_AprobacionProgramacionPeriodica: number;
  FechaHora_RevisionOperador: Date;
  FechaHora_RevisionUsuario: Date;
  Id_EstadoOperadorEjecucionProceso: number;
  Id_EstadoUsuarioEjecucionProceso: number;
  Id_EstadoEjecucionInformatica: number;
  Nombre_UsuarioRevisor: string;
  Nombre_OperadorRevisor: string;
  Nombre_RolUsuarioRevisor: string;
  Nombre_RolOperadorRevisor: string;
}

const URL_BASE = MOCK_API+'/OPE_ResultadoEjecucionProgramada2';

@Injectable()
export class ResultadoService extends RESTService<IResultado> {
  httpClient: any;

    constructor(private _http: HttpInterceptorService, ) {
        super(_http, {  
          baseUrl: MOCK_API,
          path: '/Logs',
        });
      }

      resultado: IResultado;

      GetResultado(Id_ResultadoEjecucionProgramada:number): Observable<IResultado>{
       
        return this._http.get(URL_BASE + '?id='+Id_ResultadoEjecucionProgramada)
        .pipe(
          map((res: Response) => {
            return res.json();
          }),
          ); 
      }


      putResultado(Id_ResultadoEjecucionProgramada : number, resultado : IResultado){
        console.log(Id_ResultadoEjecucionProgramada)
        return this._http.put(URL_BASE + '/' + Id_ResultadoEjecucionProgramada,resultado)
        .pipe(
          map((res: Response) => {
            return res.json;
          }
        )); 
      }
    
    
}
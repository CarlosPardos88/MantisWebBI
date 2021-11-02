import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { MOCK_API } from '../config/api.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';
import { Time } from '@angular/common';

export interface ILogs{
  NombreDirectorio: string;
  NombreArchivos: string;
  rutaArchivos: string;
  Fecha: string;
}

const URL_BASE = MOCK_API+'/Logs';

@Injectable()
export class LogsService extends RESTService<ILogs> {

  constructor(private _http: HttpInterceptorService) {
      super(_http, {  
        baseUrl: MOCK_API,
        path: '/Logs',
      });
    }

    logs: ILogs;

    GetArchivos(NombreArea: string, NombreProceso: string, Fecha: string): Observable<ILogs[]>{
        return this._http.get(URL_BASE + '?area=' + NombreArea + '&NombreProceso=' + NombreProceso + '&FechaCreacion=' + Fecha)
        .pipe(
            map((res: Response) => {
            return res.json();
            }),
            ); 
    }

    GetArchivosByPath(NombreArea: string, Id_Proceso: number): Observable<ILogs[]>{
      return this._http.get(URL_BASE + '?area=' + NombreArea + '&Id_Proceso=' + Id_Proceso )
      .pipe(
          map((res: Response) => {
          return res.json();
          }),
          ); 
  }
}
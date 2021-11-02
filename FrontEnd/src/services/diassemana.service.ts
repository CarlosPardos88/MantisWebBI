import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { MOCK_API } from '../config/api.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';

export interface IDiaSemana{
  Id_DiaSemana: number;
  Nombre_DiaSemana: string;
}

const URL_BASE = MOCK_API+'/OPE_DiaSemana';

@Injectable()
export class DiaSemanaService extends RESTService<IDiaSemana> {

  constructor(private _http: HttpInterceptorService) {
    super(_http, {  
      baseUrl: MOCK_API,
      path: 'OPE_DiaSemana',
    });
  }

  diaSemana: IDiaSemana;

  staticQuery(): Observable<IDiaSemana[]> {
    return this._http.get(URL_BASE)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  getprogramacionprocesoById(Id_Proceso: number, NombreProceso: string): Observable<IDiaSemana[]> {
    return this._http.get(URL_BASE+ '/GetIdProce' +'?Id_Proceso=' + Id_Proceso + '&Nombre_Proceso=' + NombreProceso)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  getprogramacionprocesoByIdEditar(Id: number): Observable<IDiaSemana[]> {
    return this._http.get(URL_BASE+ '/GetIdEdit' +'?Id_ProgramacionPeriodica=' + Id)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

}

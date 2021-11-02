import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { MOCK_API } from '../config/api.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';
import { Time } from '@angular/common';
import { IDiaSemana } from './diassemana.service';

export interface IProgramacionProceso {
  Id_ProgramacionPeriodica: number;
  Id_Periodicidad: number;
  Num_DiaMes: number;
  Num_MesPeriodo: number;
  Num_Semana: number;
  Hora_Ejecucion: Time;
  Id_Proceso: number;
  Fecha_Eliminado: String;
  Fecha_Creacion: String;
  Cb_Activo: string;
  OPE_PeriodicidadProceso: any;
  OPE_DiaSemana: any[];
  Nombre_Periodicidad: string;
}

export class programacionProceso {
  Id_ProgramacionPeriodica: number;
  Id_Periodicidad: number;
  Num_DiaMes: number;
  Num_MesPeriodo: number;
  Num_Semana: number;
  Hora_Ejecucion: Time;
  Id_Proceso: number;
  Fecha_Eliminado: String;
  Cb_Activo: string;
  Nombre_Periodicidad: string;
}

const URL_BASE = MOCK_API + '/OPE_ProgramacionPeriodicaProceso';

@Injectable()
export class ProgramacionProcesoService extends RESTService<IProgramacionProceso> {

  constructor(private _http: HttpInterceptorService) {
    super(_http, {
      baseUrl: MOCK_API,
      path: 'OPE_ProgramacionPeriodicaProceso',
    });
  }

  programacionProceso: IProgramacionProceso;

  staticQuery(): Observable<IProgramacionProceso[]> {
    return this._http.get(URL_BASE)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
      );
  }

  getProgramacionPeriodicaById(Id_Proceso : number): Observable<IProgramacionProceso[]> {
    return this._http.get(URL_BASE + '/GetbyId' + '?id_proceso=' + Id_Proceso)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  getprogramacionprocesoId(Id_ProgramacionPeriodica: number): Observable<IProgramacionProceso> {
    return this._http.get(URL_BASE + '?id=' + Id_ProgramacionPeriodica)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
      );
  }

  getprogramacionprocesoId2(Id_ProgramacionPeriodica: number): Observable<IProgramacionProceso> {
    return this._http.get(URL_BASE + '?id=' + Id_ProgramacionPeriodica)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
      );
  }

  putProgramaconProceso(Id_ProgramacionPeriodica: number, programacionProceso: IProgramacionProceso) {
    return this._http.put(URL_BASE + '/' + Id_ProgramacionPeriodica, programacionProceso)
      .pipe(
        map((res: Response) => {
          return res.json;
        }
        ));
  }

  getprogramacionprocesoById(Id_Proceso: number, NombreProceso: string): Observable<IProgramacionProceso[]> {
    return this._http.get(URL_BASE+'?Id_Proceso=' + Id_Proceso + '&Nombre_Proceso=' + NombreProceso)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
      );
  }

  
  getprogramacionprocesoById1(Id_Proceso: number, NombreProceso: string): Observable<IDiaSemana[]> {
    return this._http.get(URL_BASE+ '/GetIdProce' +'?Id_Proceso=' + Id_Proceso + '&Nombre_Proceso=' + NombreProceso)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
      );
      }


  postCreateProgramacion(programacionProceso: IProgramacionProceso) {
    return this._http.post(URL_BASE, programacionProceso)
      .pipe(
        map((res: Response) => {
          return res.json;
        }
        ));
  }

}

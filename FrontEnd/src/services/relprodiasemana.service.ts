import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { MOCK_API } from '../config/api.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';

export interface IRelProcesoDiaSemana{
  Id_ProgramacionPeriodica: number;
  Id_DiaSemana: number;
}

const URL_BASE = MOCK_API+'/OPE_Rel_ProgramacionPeriodica_DiaSemana';

@Injectable()
export class RelProcesoDiaSemanaService extends RESTService<IRelProcesoDiaSemana> {

  constructor(private _http: HttpInterceptorService) {
    super(_http, {  
      baseUrl: MOCK_API,
      path: 'OPE_Rel_ProgramacionPeriodica_DiaSemana',
    });
  }

  relprocesodiasemana: IRelProcesoDiaSemana;

  staticQuery(): Observable<IRelProcesoDiaSemana[]> {
    return this._http.get(URL_BASE)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  postCreateRelProDiaSemana(relprocesodiasemana : IRelProcesoDiaSemana){
    return this._http.post(URL_BASE, relprocesodiasemana)
    .pipe(
      map((res: Response) => {
        return res.json;
      }
      ));
  }

  deleteRelProDiaSemana(Id_ProgramacionPeriodica : number){
    return this._http.delete(URL_BASE + '/' + Id_ProgramacionPeriodica);
  }

}

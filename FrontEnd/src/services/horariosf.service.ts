import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { MOCK_API } from '../config/api.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';
import { Time } from '@angular/common';

export interface IHorarioSF{
    Hora_Inicio: Time;
    Hora_Fin: Time;
    Id_SistemaFuente: number;
}

export class HorarioSF{
  Hora_Inicio: Time;
  Hora_Fin: Time;
  Id_SistemaFuente: number;
}

const URL_BASE = MOCK_API+'/OPE_HorarioSistemaFuente';

@Injectable()
export class HorarioSFService extends RESTService<IHorarioSF> {

  constructor(private _http: HttpInterceptorService) {
    super(_http, {  
      baseUrl: MOCK_API,
      path: 'OPE_HorarioSistemaFuente',
    });
  }

  fuente: IHorarioSF;

  staticQuery(): Observable<IHorarioSF[]> {
    return this._http.get(URL_BASE)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  putHorarioFuente(Id_SistemaFuente : number, Hora_Inicio: Time, horarioFuente : IHorarioSF){
    return this._http.put(URL_BASE + '/?Id_SistemaFuente=' + Id_SistemaFuente+'&id='+Hora_Inicio, horarioFuente)
    .pipe(
      map((res: Response) => {
        return res.json;
      }
    )); 
  }

  postCreateHorarioFuente(horarioFuente : IHorarioSF){
    return this._http.post(URL_BASE,horarioFuente)
    .pipe(
      map((res: Response) => {
        return res.json;
      }
      ));
  }

  deleteHorarioFuente(Id_SistemaFuente : number, Hora_Inicio: Time){
    try{
      return this._http.delete(URL_BASE + '/?Id_SistemaFuente=' + Id_SistemaFuente+'&id='+Hora_Inicio);
    }catch(error){
      
    }
  }

}
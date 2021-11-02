import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { MOCK_API } from '../config/api.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';

export interface IRelProcesofuente{
  Id_SistemaFuente: number;
  Id_Proceso: number;
}

const URL_BASE = MOCK_API+'/OPE_Rel_Proceso_SistemaFuente';

@Injectable()
export class RelProcesoFuenteService extends RESTService<IRelProcesofuente> {

  constructor(private _http: HttpInterceptorService) {
    super(_http, {  
      baseUrl: MOCK_API,
      path: 'OPE_Rel_Proceso_SistemaFuente',
    });
  }

  relprocesofuente: IRelProcesofuente;

  staticQuery(): Observable<IRelProcesofuente[]> {
    return this._http.get(URL_BASE)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  postCreateRelProFuente(relProcesoFuente : IRelProcesofuente){
    return this._http.post(URL_BASE, relProcesoFuente)
    .pipe(
      map((res: Response) => {
        return res.json;
      }
      ));
  }

  deleteRelProFuente(Id_Proceso : number){
    return this._http.delete(URL_BASE + '/?id=' + Id_Proceso);
  }

  getProPreByFuente(Id_SistemaFuente: number): Observable<IRelProcesofuente[]> {
    let url = URL_BASE + '/?id=' + Id_SistemaFuente
    return this._http.get(url)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

}

import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { MOCK_API } from '../config/api.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';

export interface IRutaPreProceso{
  Id_RutaPrerequisito: number;
  Id_Proceso: number;
  Desc_RutaArchivo: string;
}

const URL_BASE = MOCK_API+'/OPE_RutaPrerequisitoProceso';

@Injectable()
export class RutaPreProcesoService extends RESTService<IRutaPreProceso> {

  constructor(private _http: HttpInterceptorService) {
    super(_http, {  
      baseUrl: MOCK_API,
      path: 'OPE_RutaPrerequisitoProceso',
    });
  }
   
  rutaPreProceso: IRutaPreProceso;

  postCreateRelProRuta(relProcesoFuente : IRutaPreProceso){
    return this._http.post(URL_BASE, relProcesoFuente)
    .pipe(
      map((res: Response) => {
        return res.json;
      }
    ));
  }

  getProPreByProceso(IdProceso: number): Observable<[]> {
    let url = URL_BASE + '/?IdProceso=' + IdProceso
    return this._http.get(url)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  deleteRelProRuta(ideliminar : number){
    return this._http.delete(URL_BASE + '/' + ideliminar);  
  }

  getByProceso(IdProceso: number): Observable<IRutaPreProceso[]> {
    return this._http.get(URL_BASE + '?Id_Proceso=' + IdProceso)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

}
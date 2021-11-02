import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { MOCK_API } from '../config/api.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';

export interface IProcesoPrerequisito{
  Id_ProcesoPrerequisito: number;
  Id_Proceso: number;
  Id_ProcesoRequerido: number;
}

const URL_BASE = MOCK_API+'/OPE_ProcesoPrerequisito';

@Injectable()
export class ProcesoPrerequisitoService extends RESTService<IProcesoPrerequisito> {

  constructor(private _http: HttpInterceptorService) {
    super(_http, {  
      baseUrl: MOCK_API,
      path: 'OPE_ProcesoPrerequisito',
    });
  }

  procesoPrerequisito: IProcesoPrerequisito;

  postCreateRelProPre(procesoPrerequisito : IProcesoPrerequisito){
    return this._http.post(URL_BASE, procesoPrerequisito)
    .pipe(
      map((res: Response) => {
        return res.json;
      }
      ));
  }

  deleteRelProPre(Id_ProcesoPrerequisito : number){
    try{
      return this._http.delete(URL_BASE + '/?id=' + Id_ProcesoPrerequisito);
    }catch(error){
    }
  };

  getProPreByProceso(IdProceso: number): Observable<[]> {
    let url = URL_BASE + '/?IdProceso=' + IdProceso
    return this._http.get(url)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }
}

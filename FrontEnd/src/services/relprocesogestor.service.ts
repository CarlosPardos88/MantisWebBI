import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { MOCK_API } from '../config/api.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';

export interface IRelProcesoGestor{
  Id_ProcesoGestor: string;
  Id_Proceso: number;
}

const URL_BASE = MOCK_API+'/OPE_Rel_Proceso_ProcesoGestor';

@Injectable()
export class RelProcesoGestorService extends RESTService<IRelProcesoGestor> {

  constructor(private _http: HttpInterceptorService) {
    super(_http, {  
      baseUrl: MOCK_API,
      path: 'OPE_Rel_Proceso_ProcesoGestor',
    });
  }

  relProcesoGestor: IRelProcesoGestor;

  postCreateRelProRuta(relProcesoGestor : IRelProcesoGestor){
    return this._http.post(URL_BASE, relProcesoGestor)
    .pipe(
      map((res: Response) => {
        return res.json;
      }
    ));
  }

  deleteRelProRuta(Id_ProcesoGestor: string, Id_Proceso : number){
    return this._http.delete(URL_BASE + '/?id=' + Id_ProcesoGestor + '&idp=' + Id_Proceso);  
  }

}
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { MOCK_API } from '../config/api.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';

export interface ITipoFuente{
  Id_TipoSistemaFuente: number;
  Nombre_TipoSistemaFuente: string;
}

export class TipoFuente{
  Id_TipoSistemaFuente: number;
  Nombre_TipoSistemaFuente: string;
  
}

const URL_BASE = MOCK_API+'/OPE_TipoSistemaFuente';

@Injectable()
export class TiposisfuenteService extends RESTService<ITipoFuente> {

  constructor(private _http: HttpInterceptorService) {
    super(_http, {  
      baseUrl: MOCK_API,
      path: 'OPE_TipoSistemaFuente',
    });
  }

  tipofuente: ITipoFuente;

  staticQuery(): Observable<ITipoFuente[]> {
    return this._http.get(URL_BASE)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

}

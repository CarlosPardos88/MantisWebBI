import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { MOCK_API } from '../config/api.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';

export interface IPeriodicidad{
  Id_Periodicidad: number;
  Nombre_Periodicidad: string;
}

const URL_BASE = MOCK_API+'/OPE_PeriodicidadProceso';

@Injectable()
export class PeriodicidadService extends RESTService<IPeriodicidad>  {

    constructor(private _http: HttpInterceptorService) {
        super(_http, {  
          baseUrl: MOCK_API,
          path: 'OPE_PeriodicidadProceso',
        });
      }
    
      periodicidad: IPeriodicidad;
    
      staticQuery(): Observable<IPeriodicidad[]> {
        return this._http.get(URL_BASE)
        .pipe(
          map((res: Response) => {
            return res.json();
          }),
        );
      }

    

}
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { MOCK_API } from '../config/api.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';

export interface IProcesoTD{
  ProcesoCD: string;
  NombreProceso: string;
  IndReinyeccion: string;
  indEjecuta: string;
  ProcesoDesc: string;
  Version: string;
  FechaUltModificacion: string;
  EspecificadoPor: string;
  VistaTransformacionCD: string;
  IndActivo: string;
  LayoutOrigenCD: number;
}

const URL_BASE = MOCK_API+'/OPE_ProcesoTD';

@Injectable()
export class ProcesoTDService extends RESTService<IProcesoTD> {

  constructor(private _http: HttpInterceptorService) {
    super(_http, {  
      baseUrl: MOCK_API,
      path: 'OPE_ProcesoTD',
    });
  }

  procesoTD: IProcesoTD;

  staticQuery(Num_InicioRangoCodProceso: string, Num_FinRangoCodProceso: string): Observable<IProcesoTD[]> {
    return this._http.get(URL_BASE + '?rangoinicial=' + Num_InicioRangoCodProceso + '&rangofinal=' +Num_FinRangoCodProceso)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

}

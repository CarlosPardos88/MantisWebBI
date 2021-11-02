import { Provider, SkipSelf, Optional, InjectionToken } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';

import { IArea } from '../../areas/services/areas.service';
import { IFuente } from '../../fuentes/services/fuentes.service';
import { IProcesoPrerequisito } from '../../../services/procesopre.service';
import { MOCK_API } from '../../../config/api.config';
import { Time } from '@angular/common';

export interface IProceso {
  Id_Proceso: number;
  Nombre_Proceso: string;
  Desc_Proceso: string;
  Id_AreaNegocio: number;
  Num_TiempoEstimadoEjec: number;
  Cb_ActualAutomaParametros: string;
  Cb_UtilizaParametros: string;
  Fecha_Eliminado: String;
  Cb_RevisionAutomaticaUsuario: string;
  Cb_RevisionAutomaticaOperador: string;
  Cb_PermitirSolicitudOperador:string;
  Cb_Activo?: string;
  Nombre_AreaNegocio?: String;
  OPE_AreaNegocio: IArea[];
  OPE_SistemaFuente: IFuente[];
  OPE_ProcesoPrerequisito: IProcesoPrerequisito[];
  OPE_RutaPrerequisitoProceso: any[];
  OPE_Rel_Proceso_ProcesoGestor: any[];
  OPE_ProgramacionPeriodicaProceso: any[];
  Hora_Inicio? : Time;
  Hora_Fin? : Time;
  Id_SistemaFuente? : number
  Nombre_SistemaFuente? : string;
  Id_TipoSistemaFuente? : string;
  
}

export class Proceso {
  Id_Proceso: number;
  Nombre_Proceso: string;
  Desc_Proceso: string;
  Id_AreaNegocio: number;
  Num_TiempoEstimadoEjec: number;
  Cb_ActualAutomaParametros: string;
  Cb_UtilizaParametros: string;
  Fecha_Eliminado: String;
  Cb_RevisionAutomaticaUsuario: string;
  Cb_RevisionAutomaticaOperador: string;
  Cb_PermitirSolicitudOperador:string;
  Cb_Activo?: String = null;
  Nombre_AreaNegocio?: String = null;
  OPE_AreaNegocio: IArea;
  Hora_Inicio? : Time;
  Hora_Fin? : Time;
  Id_SistemaFuente? : number
  Nombre_SistemaFuente? : string;
  Id_TipoSistemaFuente? : string;
}

const URL_BASE = MOCK_API+'/OPE_Proceso';


export class ProcesoService extends RESTService<IProceso> {

  constructor(private _http: HttpInterceptorService, api: string) {
    super(_http, {
      baseUrl: api,
      path: '/OPE_Proceso',
    });
  }

  proceso: IProceso;
  //GetAllProceso

  staticQueryVista(): Observable<IProceso[]> {
    return this._http.get(URL_BASE + '/GetAllProceso')
    .pipe(
      map((res: Response) => {
        console.log(res.json());
        return res.json();
      }),
    );
  }
  
  staticQuery(): Observable<IProceso[]> {
    return this._http.get(URL_BASE + '/Getall')
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  staticQueryId(Id:number): Observable<IProceso> {
   
    return this._http.get(URL_BASE + '/Getid?id='+Id)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
    }

    staticQueryIdProceso(Id:number): Observable<IProceso> {
   
      return this._http.get(URL_BASE + '/GetIdProceso2?id='+Id)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
      );
  }

  staticQuerySolicitudDemanda(): Observable<IProceso[]> {
    return this._http.get(URL_BASE + '/SolicitudDemanda')
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }
  
  getprocesoByIdName(Id_Proceso : number,Nombre_Proceso: string): Observable<IProceso[]> {
    return this._http.get(URL_BASE + '?Id_Proceso=' + Id_Proceso + '&Nombre_Proceso=' +Nombre_Proceso)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  getprocesoByIdFuente(Id_Proceso : number,id_sistemafuente: number): Observable<IProceso[]> {
    return this._http.get(URL_BASE + '?id_proceso=' + Id_Proceso + '&id_sistemafuente=' +id_sistemafuente)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  postCreateProceso(proceso : IProceso){
    return this._http.post(URL_BASE,proceso)
    .pipe(
      map((res: Response) => {
        return res.json;
      }
      ));
  }

  putProceso(Id_Proceso : number, proceso : IProceso){
    return this._http.put(URL_BASE + '/' + Id_Proceso, proceso)
    .pipe(
      map((res: Response) => {
        return res.json;
      }
    )); 
  }

  deleteProceso(Id_Proceso : number){
    return this._http.delete(URL_BASE + '/' + Id_Proceso);
  }

}

export const PROCESOS_API: InjectionToken<string> = new InjectionToken<string>('PROCESOS_API');

export function PROCESO_PROVIDER_FACTORY(
  parent: ProcesoService, interceptorHttp: HttpInterceptorService, api: string): ProcesoService {
  return parent || new ProcesoService(interceptorHttp, api);
}

export const PROCESO_PROVIDER: Provider = {
  provide: ProcesoService,
  deps: [[new Optional(), new SkipSelf(), ProcesoService], HttpInterceptorService, PROCESOS_API],
  useFactory: PROCESO_PROVIDER_FACTORY,
};
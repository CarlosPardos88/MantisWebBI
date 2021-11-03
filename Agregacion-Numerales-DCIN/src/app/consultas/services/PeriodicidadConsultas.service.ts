import { Injectable, InjectionToken, Provider, SkipSelf, Optional } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient, HttpInterceptor } from '@angular/common/http';
import { MOCK_API } from 'src/config/api.config';
import { ITdHttpInterceptor } from '@covalent/http';
import {
  mixinHttp,
} from '@covalent/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IPeridicidad{
  Id_Periodicidad: number;
  Desc_Periodicidad: string;
}


const URL_BASE = MOCK_API+'/RC_PeriodicidadAgregacionNumerales';
@Injectable({
  providedIn: 'root'
})


export class PeriodicidadConsultasService extends mixinHttp(class {
  list : IPeridicidad[];
}, {

baseUrl: MOCK_API,
baseHeaders: new HttpHeaders({ 'Accept': 'application/json' }),
}, HttpClient) { 
  
  constructor(private http: HttpClient){
    super(http, {
      baseUrl: MOCK_API,
      path: '/RC_PeriodicidadAgregacionNumerales',
    });
  }

  getPeriodicidad(id_fuente: number): Observable<IPeridicidad[]> {
    return this.http.get(URL_BASE + '?id_fuente='+id_fuente).pipe(
      map((res: IPeridicidad[]) => {
        return res;
      }),
    );
  }
}
export const PERIODICIDAD_API: InjectionToken<string> = new InjectionToken<string>('PERIODICIDAD_API');

export function PERIODICIDAD_PROVIDER_FACTORY(
    parent: PeriodicidadConsultasService, interceptorHttp: HttpClient, api: string): PeriodicidadConsultasService {
  return parent || new PeriodicidadConsultasService(interceptorHttp);
}

export const PERIODICIDAD_PROVIDER: Provider = {
  // If there is already a service available, use that. Otherwise, provide a new one.
  provide: PeriodicidadConsultasService,
  deps: [[new Optional(), new SkipSelf(), PeriodicidadConsultasService], HttpClient, PERIODICIDAD_API],
  useFactory: PERIODICIDAD_PROVIDER_FACTORY,
};
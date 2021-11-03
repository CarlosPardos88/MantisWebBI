import { Injectable, InjectionToken, Provider, SkipSelf, Optional } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient, HttpInterceptor } from '@angular/common/http';
import { MOCK_API } from 'src/config/api.config';
import { ITdHttpInterceptor } from '@covalent/http';
import {
  mixinHttp,
} from '@covalent/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IAgregacion{
  Id_Fuente: number;
  Desc_Fuente: string;
}


const URL_BASE = MOCK_API+'/RC_FuenteAgregacionNumerales';
@Injectable({
  providedIn: 'root'
})


export class AgregacionService extends mixinHttp(class {
  list : IAgregacion[];
}, {

baseUrl: MOCK_API,
baseHeaders: new HttpHeaders({ 'Accept': 'application/json' }),
}, HttpClient) { 
  
  constructor(private http: HttpClient){
    super(http, {
      baseUrl: MOCK_API,
      path: '/RC_FuenteAgregacionNumerales',
    });
  }

  getAgregacion(): Observable<any> {
    return this.http.get(URL_BASE).pipe(
      map((res: Response) => {
        return res;
      }),
    );
  }
}


export const AGREGACION_API: InjectionToken<string> = new InjectionToken<string>('AGREGACION_API');

export function AGREGACION_PROVIDER_FACTORY(
    parent: AgregacionService, interceptorHttp: HttpClient, api: string): AgregacionService {
  return parent || new AgregacionService(interceptorHttp);
}

export const AGREGACION_PROVIDER: Provider = {
  // If there is already a service available, use that. Otherwise, provide a new one.
  provide: AgregacionService,
  deps: [[new Optional(), new SkipSelf(), AgregacionService], HttpClient, AGREGACION_API],
  useFactory: AGREGACION_PROVIDER_FACTORY,
};
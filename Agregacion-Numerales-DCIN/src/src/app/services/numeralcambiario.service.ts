import { Injectable, InjectionToken, Provider, SkipSelf, Optional } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient, HttpInterceptor } from '@angular/common/http';
import { MOCK_API } from 'src/config/api.config';
import { ITdHttpInterceptor } from '@covalent/http';
import {
  mixinHttp,
} from '@covalent/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface INumeral {
  Sk_RCNumeralCambiario: number;
  Desc_NumeralCambiario: string;
}

const URL_BASE = MOCK_API+'/NumeralCambiario';
@Injectable({
  providedIn: 'root'
})


export class NumeralcambiarioService extends mixinHttp(class {
  list : INumeral[];
}, {

baseUrl: MOCK_API,
baseHeaders: new HttpHeaders({ 'Accept': 'application/json' }),
}, HttpClient) { 
  
  constructor(private http: HttpClient){
    super(http, {
      baseUrl: MOCK_API,
      path: '/NumeralCambiario',
    });
  }

  getNumerales(): Observable<any> {
    return this.http.get(URL_BASE).pipe(
      map((res: Response) => {
        return res;
      }),
    );
  }
}
export const NUMERALES_API: InjectionToken<string> = new InjectionToken<string>('NUMERALES_API');

export function NUMERALES_PROVIDER_FACTORY(
    parent: NumeralcambiarioService, interceptorHttp: HttpClient, api: string): NumeralcambiarioService {
  return parent || new NumeralcambiarioService(interceptorHttp);
}

export const NUMERALES_PROVIDER: Provider = {
  // If there is already a service available, use that. Otherwise, provide a new one.
  provide: NumeralcambiarioService,
  deps: [[new Optional(), new SkipSelf(), NumeralcambiarioService], HttpClient, NUMERALES_API],
  useFactory: NUMERALES_PROVIDER_FACTORY,
};
import { Injectable, InjectionToken, Provider, SkipSelf, Optional } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient, HttpInterceptor } from '@angular/common/http';
import { MOCK_API } from 'src/config/api.config';
import { ITdHttpInterceptor } from '@covalent/http';

import {
  mixinHttp,
} from '@covalent/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemFlatNode } from '../estructura/services/node.service'


const URL_BASE = MOCK_API + '/ResultadoNodo';

@Injectable({
  providedIn: 'root'
})


export class NodoDBService extends mixinHttp(class {
  list: ItemFlatNode[];
}, {

  baseUrl: MOCK_API,
  baseHeaders: new HttpHeaders({ 'Accept': 'application/json' }),
}, HttpClient) {

  constructor(private http: HttpClient) {
    super(http, {
      baseUrl: MOCK_API,
      path: '/ResultadoNodo',
    });
  }

  getNodo(Id_Estructura: number, Desc_Estructura: string): Observable<ItemFlatNode[]> {
    return this.http.get(URL_BASE + '?Id_Estructura=' + Id_Estructura + '&Desc_Estructura=' + Desc_Estructura)
      .pipe(
        map((res: ItemFlatNode[]) => {

          return res;
        }),
      );
  }

}


export const NODODB_API: InjectionToken<string> = new InjectionToken<string>('NODODB_API');

export function NODODB_PROVIDER_FACTORY(
  parent: NodoDBService, interceptorHttp: HttpClient, api: string): NodoDBService {
  return parent || new NodoDBService(interceptorHttp);
}

export const ESTRUCTURA_PROVIDER: Provider = {
  // If there is already a service available, use that. Otherwise, provide a new one.
  provide: NodoDBService,
  deps: [[new Optional(), new SkipSelf(), NodoDBService], HttpClient, NODODB_API],
  useFactory: NODODB_PROVIDER_FACTORY,
};
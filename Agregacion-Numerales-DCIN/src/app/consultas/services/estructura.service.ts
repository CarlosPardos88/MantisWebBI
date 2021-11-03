import { Injectable, InjectionToken, Provider, SkipSelf, Optional } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient, HttpInterceptor } from '@angular/common/http';
import { MOCK_API } from 'src/config/api.config';
import { ITdHttpInterceptor } from '@covalent/http';
import { IEstructura, ESTRUCTURA_API, ESTRUCTURA_PROVIDER, ESTRUCTURA_PROVIDER_FACTORY, Estructura} from '../../estructura/services/estructura.service';
import {
  mixinHttp,
} from '@covalent/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from 'services/login.service';

const URL_BASE = MOCK_API + '/RC_EstructuraAgregacionNumerales';

@Injectable({
  providedIn: 'root'
})

export class EstructuraService extends mixinHttp(class {
  list : IEstructura[];
}, {

baseUrl: MOCK_API,
baseHeaders: new HttpHeaders({ 'Accept': 'application/json' }),
}, HttpClient) { 
  
  constructor(private http: HttpClient){
    super(http, {
      baseUrl: MOCK_API,
      path: '/RC_EstructuraAgregacionNumerales',
    });
  }


}
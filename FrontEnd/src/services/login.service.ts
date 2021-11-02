import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';
import { MOCK_API } from '../config/api.config';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Menu} from "../app/models/menu.model";

@Injectable()
export class LoginService extends RESTService<any> {

  list : Menu[];
  usuarioOut : string;

  constructor(private _http: HttpInterceptorService) {
    super(_http, {
      baseUrl: MOCK_API,
      path: 'login',
    });
  }

  MenuGetByUser(usuario: string): Observable<Menu[]> {
    return this._http.get('data/menu.json').pipe(
      map((res: Response) => {
        return this.list = res.json();
      }),
    );
  }

  GetMenuS3(usuario: any){
    return this._http.post(MOCK_API+"/MenuS3", usuario).pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  setUser(usuarioOut : string){
    return this.usuarioOut = usuarioOut;
  }
}
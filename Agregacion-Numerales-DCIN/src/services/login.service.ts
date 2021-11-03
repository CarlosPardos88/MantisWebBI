import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { MOCK_API } from 'src/config/api.config';
import { Menu } from "../app/models/menu.model";

import {
  mixinHttp,
  TdGET,
  TdPOST,
  TdBody,
  TdParam,
  TdResponse,
  TdQueryParams,
} from '@covalent/http';
const MOCK_API_ ="Http://localhost:44365/Api";
export class Usuario{
  usuario: string;
}


@Injectable()
export class LoginService extends mixinHttp(class {
    list : Menu[];
    user:any;
}, {

  baseUrl: MOCK_API,
  baseHeaders: new HttpHeaders({ 'Accept': 'application/json' }),
}, HttpClient) {
  
  constructor(private http: HttpClient){
    super(http, {
      baseUrl: MOCK_API,
      path: 'login',
    });
  }

  /*public PostAutentica(user_: Usuario): Observable<any> 
  {
    //var usuario = user.usuario;
   
    let body = JSON.stringify(user_);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    let options = { headers: headers };
    console.log("El servicio api usuario = "+user_.usuario);
    this.ruta = MOCK_API_+"/Autentica";
    console.log("El servicio api ruta = "+this.ruta);
    //console.log("El servicio api con ruta completa = "+URL_BASE+ `?usuario=`+user.usuario);
    return  this.http.get<string>(this.ruta+ `?usuario=`+user_.usuario);      

  }  
*/

  //Home/Login
/*  getLogin(user:any){
    console.log("Ingresando getLogin "+user)
    return this.http.get(MOCK_API_+"/Autentica/"+user).pipe(
      map((res: Response) => {
        console.log("Repondiendo login");
        return this.user = res;
      }),
    );
  }
  */
 
  getMenu(): Observable<any> {
    return this.http.get("data/menu.json").pipe(
      map((res: Response) => {
        return this.list = res;
      }),
    );
  }

  GetMenuS3(usr: any): Observable<any>{

    return this.http.post(MOCK_API+"/MenuS3", usr).pipe(
      map((res: Response) => {
        return res;
      }),
    );
  }

}
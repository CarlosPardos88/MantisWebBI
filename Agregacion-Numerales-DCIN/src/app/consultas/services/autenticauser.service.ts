import { Injectable, InjectionToken, Provider, SkipSelf, Optional } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient, HttpInterceptor } from '@angular/common/http';
import { MOCK_API } from 'src/config/api.config';
import { mixinHttp } from '@covalent/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router, ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";


export interface IUsuario {
  usuario: string;
  pwd: string;
  
}

export class Usuario{
  usuario: string;
  pwd: string;
}


const URL_BASE = MOCK_API+'/AutenticacionWindows';
@Injectable({ providedIn: 'root' })

@Injectable({
  providedIn: 'root'
})
export class AutenticauserService {
  usuarioRed: string;
  usuario: Usuario;
  resAutenticacion: string;
  constructor(
    private http: HttpClient  
  ){

  }

  postAutenticar(colle : IUsuario){   
    return this.http.post(URL_BASE,colle)
    .pipe(
      map((res: string) => {
        return res;
      }
      ));
  }

  /*
  AutenticacionWindows(Colle : Usuario): Observable<any> {
    return this.http.post(URL_BASE + 'AutenticacionWindows',Colle).pipe(
      map((res: Response) => {
        console.log(res)
        return res;
      }),
    );
  }
  */
}

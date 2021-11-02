import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Http, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";
import { MOCK_API } from '../config/api.config';

const URL_BASE = MOCK_API+'/Logs';

@Injectable()

export class DescargaService {

  constructor(private http: Http) {}


    DownloadFile(NombreProceso: string, carpetaArea:string): any{

        return this.http.request(URL_BASE + '?file=' + NombreProceso + '&carpetaArea=' +carpetaArea);

    }
    
   
}
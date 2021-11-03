import { MOCK_API } from './../../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable, ɵConsole } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultaResultadoService {

  RESULTADO_AGREGACION_NUMERALES = MOCK_API + '/RC_ResultadoAgregacionNumerales';
  RESULTADO_NODO= MOCK_API+ '/ResultadoNodo/';

  constructor(private http: HttpClient) { }
  
  getNodeStructure = (idStructure: number,desc_estructura: string) =>
    this.http.get(this.RESULTADO_NODO + `?Id_Estructura=${idStructure}&Desc_Estructura=${desc_estructura}`);

  getResultadoAgregacionById = (idStructura: number, Sk_Consulta: number, Id_Periodicidad: number) =>
  
    this.http.get(this.RESULTADO_AGREGACION_NUMERALES + `?Id_Estructura=${idStructura}` + `&Sk_Consulta=${Sk_Consulta}`+ `&Id_Periodicidad=${Id_Periodicidad}`);

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoAprobacion'
})
export class EstadoAprobacionPipe implements PipeTransform {

  transform(aprobado: string, vencido?: string): any {
    let homologado:string;
    if(!aprobado){
      aprobado = '';
    }
    switch(aprobado.toUpperCase()){
      case 'S':
        vencido=='S'?homologado = 'No Definido':homologado = 'Aprobado';
      break;
      case 'N':
        vencido=='S'?homologado = 'Vencido':homologado = 'Sin Aprobación';
        break;
      default: homologado = 'No Definido';
    }
    return homologado;
  }

}

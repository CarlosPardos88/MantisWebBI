import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'homologacion'
})
export class HomologacionPipe implements PipeTransform {

  transform(value: string, args?: string): string {
    let homologado:string;
    if(!value){
      value = '';
    }

    switch(value.toUpperCase()){
      case 'S':
        homologado = 'SI';
      break;
      case 'N':
          homologado = 'NO';
        break;
      default: homologado = 'N/D';
    }
    return homologado;
  }
}

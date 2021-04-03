import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rutas'
})
export class RutasPipe implements PipeTransform {

  transform(value: string): string[] {
    value = value.split('').map(letra => letra = letra === '/' ? ' > ' : letra ).join('');  
    
    while(value.search('%20') !== -1){
      value = value.replace('%20', ' ')
    }

    return value.slice(3, value.length).split(' > ');
  }

}

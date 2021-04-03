import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipo'
})
export class TipoPipe implements PipeTransform {

  transform(dato: number): string {
    const value = Number(dato);
    if(value / 1024 >= 1) return `${ (value / 1024).toFixed(2) } MB`;
    if(value / 1048576 >= 1) return `${ (value / 1048576).toFixed(2)} GB`;
    return `${ value.toFixed(2) } Kb`;
  }

}

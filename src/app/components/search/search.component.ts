import { Component, Output, EventEmitter } from '@angular/core';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  value: string = '';
  @Output() archivos = new EventEmitter<any[]>();
  constructor(private _crud: CrudService) { }


  buscar(busqueda: string) {
    this.value = busqueda;
    if(busqueda.trim() === '') {
      this.archivos.emit( [] );
      return ;
    }
    this.archivos.emit( this._crud.buscador(busqueda) );
  }

}

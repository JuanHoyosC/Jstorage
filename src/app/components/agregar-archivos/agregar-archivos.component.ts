import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-archivos',
  templateUrl: './agregar-archivos.component.html',
  styleUrls: [ './agregar-archivos.component.css' ]
})
export class AgregarArchivosComponent  {

  @Input() carpeta;
  constructor() { }

  leerArchivos( { target } ){
    console.log(target.files)
  }

  
}

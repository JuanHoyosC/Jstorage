import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetallesComponent } from 'src/app/components/detalles/detalles.component';
import { CrudService } from 'src/app/services/crud.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  @ViewChild( DetallesComponent ) detallesnav: DetallesComponent;
  constructor(private _snackBar: MatSnackBar, public _crud: CrudService) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  abrirDetalles(carpeta) {
    this.detallesnav.archivo = carpeta
    this.detallesnav.abrir();
  }

  cerrarDetalles() {
    this.detallesnav.cerrar();
  }


}

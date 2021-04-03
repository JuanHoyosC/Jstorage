import { Component, ViewChild } from '@angular/core';
import { DetallesComponent } from 'src/app/components/detalles/detalles.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { ArchivoModel } from 'src/app/model/archivo.model';
import { FolderModel } from 'src/app/model/folder.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent {



  files: ArchivoModel[];
  folder: FolderModel;
  archivo: any = {}
  nameArchivo;
  @ViewChild(DetallesComponent) detallesnav: DetallesComponent;

  constructor( public _crud: CrudService, private _activatedRoute: ActivatedRoute, private _route: Router) {

   this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const nombre = params.get('nombre');
      const nombreArchivo = params.get('archivo');
      this.nameArchivo = nombreArchivo;
      this._crud.obtenerCarpeta(nombre).subscribe((res: Observable<any>) => {
        res.subscribe(folder => {
          this.folder = folder[0]
          this.files = nombreArchivo ?
            folder[0]?.archivos.filter(archivo => (archivo.nombre.replaceAll(' ', '-') + '.' + archivo.tipo) === nombreArchivo)
            : folder[0]?.archivos
            console.log(this.files)
        });
      });
    });

  }

  abrirDetalles(archivo) {
    this.detallesnav.abrir();
    this.archivo = archivo;
  }

  cerrarDetalles() {
    this.detallesnav.cerrar();
  }



}

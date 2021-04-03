import { Component, ElementRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogElementsExample } from '../modal-vista/modal-vista.component';
import { ArchivoModel } from '../../model/archivo.model';
import { MatMenuTrigger } from '@angular/material/menu';
import { saveAs } from 'file-saver';
import { CrudService } from 'src/app/services/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent {

  @Input() archivos: any[] = []
  @Output() verDetalles: EventEmitter<ArchivoModel> = new EventEmitter();
  @Output() cerrarDetalles: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  archivoSelect: any;
  archivoElement;
  index: number;

  constructor(private el: ElementRef, public dialog: MatDialog, public _crud: CrudService) { }

  ver(archivo) {
    this.dialog.open(DialogElementsExample, { data: archivo });
    this.cerrarDetalles.emit()
  }

  seleccionar(card, archivo) {
    this.archivoElement = card;
    this.iluminar(card);
    this.verDetalles.emit(archivo);
  }

  iluminar(card) {
    const listas = this.el.nativeElement.querySelector('.container_archivos')
    const cantidad = listas.childElementCount
    for (let i = 0; i < cantidad; i++) {
      listas.children[i].children[0].classList.remove("container-seleccion")
    }
    card.classList.add("container-seleccion")
  }

  opciones(archivo, i: number) {
    this.archivoElement = archivo;
    this.archivoSelect = this.archivos[i];
    this.index = i;
    this.cerrar();
    this.iluminar(this.archivoElement);
    this.contextMenuPosition.x = archivo.getBoundingClientRect().x + 'px';
    this.contextMenuPosition.y = archivo.offsetTop + archivo.offsetHeight + 'px';
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  cerrar() {
    this.cerrarDetalles.emit(true);
  }

  abrirArchivo(ruta) {
    console.log(ruta.split('?alt')[0])
    window.open(ruta, '_blank');
  }


  descargar(path) {
    this._crud.descargarArchivo(path);
  }

  eliminar() {
    this._crud.borrarArchivo(this.archivos, this.index);
  }


  mover(folder) {
   this._crud.mover(folder, this.archivoSelect, this.index);
  }

}

import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { FolderModel } from '../../model/folder.model';
import { CrudService } from '../../services/crud.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-modal-nombre',
  templateUrl: './modal-nombre.component.html'
})


export class DialogElementsNombre {

  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data, private _crud: CrudService, private _snackBar: MatSnackBar) {
  }

  cambiarNombre(form: NgForm) {
    if (form.invalid) return;
    this._crud.cambiarNombre(this.data, form.value.nombre).then((res: any) => {
      if (res?.mensaje) {
        this._snackBar.open(res['mensaje'], 'Cerrar', { duration: 2000 });
      }
      this.dialog.closeAll()
    })
    //this._crud.actualizarCarpeta().then(el => this.dialog.closeAll())
  }
}


@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent {

  @Output() verDetalles: EventEmitter<FolderModel> = new EventEmitter();
  @Output() cerrarDetalles: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  estaSobre = false;

  contextMenuPosition = { x: '0px', y: '0px' };

  constructor(private el: ElementRef, private router: Router, public _crud: CrudService,
    public dialog: MatDialog) {
  }

  colores: any[] = ['warn', 'primary', 'accent']
  carpeta;
  index: number = 0;
  archivos: any[] = [];

  seleccionar(drag) {

    const listas = this.el.nativeElement.querySelector('.carpetas')
    const cantidad = listas.childElementCount
    for (let i = 0; i < cantidad; i++) {
      listas.children[i].classList.remove("example-drag")
    }
    this.cerrarDetalles.emit(true);
    drag.classList.add("example-drag")
  }

  opciones(drag, i: number) {
    this.carpeta = drag;
    this.index = i;
    this.contextMenuPosition.x = drag.offsetLeft + 'px';
    this.contextMenuPosition.y = drag.offsetTop + drag.offsetHeight + 'px';
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
    this.seleccionar(drag);
    this.cerrarDetalles.emit(true);
  }

  irA(nombre: string) {
    this.router.navigateByUrl(`carpetas/${nombre.replace(/ /g, '-')}`);
  }

  eliminar() {
    this.carpeta.classList.add("animate__bounceOutDown")
    const size = this._crud.folders[this.index].archivos.length;
    setTimeout(() => {
      if (size === 0) { this.borrarCarpeta(); return; }
      this._crud.borrarCarpeta(this._crud.folders[this.index]).subscribe(cont => {
        if ((size - 1) === cont) this.borrarCarpeta();
      })
    }, 900)
  }

  borrarCarpeta() {
    this._crud.folders.splice(this.index, 1);
    this._crud.actualizarCarpeta().then();
  }

  detalles() {
    this.verDetalles.emit(this._crud.folders[this.index]);
  }

  cambiarColor(color) {
    this.carpeta.classList.add("animate__rubberBand")
    this._crud.folders[this.index].color = color;

    setTimeout(() => {
      this.carpeta.classList.remove("animate__rubberBand");
      this._crud.actualizarCarpeta().then();
    }, 900)
  }

  abrirModal() {
    this.dialog.open(DialogElementsNombre, { data: this._crud.folders[this.index] });
  }

}


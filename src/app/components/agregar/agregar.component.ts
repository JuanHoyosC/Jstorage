import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { CrudService } from '../../services/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-vista-example',
  templateUrl: './agregar.modal.html',
  styleUrls: ['./modal.component.css']
})
export class DialogElementsAgregar {

  constructor(private _crud: CrudService, public dialog: MatDialog, private _snackBar: MatSnackBar) {
  }

  crearCarpeta(form: NgForm) {
    if (form.invalid) return;
    this._crud.crearCarpeta(form.value)
      .then((res : any)=> {
        if (res?.mensaje) {
          this._snackBar.open(res['mensaje'], 'Cerrar', { duration: 2000 });
        }
        this.dialog.closeAll()
      })
      .catch(err => console.log("Todo incorrecto", err))
  }
}





@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})

export class AgregarComponent {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(DialogElementsAgregar);
  }


}

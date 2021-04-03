import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TipoFileService } from '../../services/tipo-file.service';

export interface DialogData {
  data: any;
}

@Component({
  selector: 'app-modal-vista-example',
  templateUrl: './modal-vista-example.html',
  styleUrls: ["modal-vista-example.css"]
})
export class DialogElementsExample {

  archivo;

  constructor(public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: any, 
              public _tipo: TipoFileService) {
    this.archivo = data;
  }



}


@Component({
  selector: 'app-modal-vista',
  template: ''
})
export class ModalVistaComponent {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogElementsExample);
  }


}

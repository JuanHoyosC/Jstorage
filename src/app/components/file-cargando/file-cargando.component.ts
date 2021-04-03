import { Component, OnInit } from '@angular/core';
import { TipoFileService } from 'src/app/services/tipo-file.service';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-file-cargando',
  templateUrl: './file-cargando.component.html',
  styleUrls: ['./file-cargando.component.css']
})
export class FileCargandoComponent implements OnInit {
  panelOpenState = true;
  constructor(public _crud: CrudService, public _tipo: TipoFileService) { }

  ngOnInit(): void {
  }

}

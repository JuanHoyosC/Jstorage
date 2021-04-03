import { Component, Input} from '@angular/core';
import { TipoFileService } from 'src/app/services/tipo-file.service';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: [ './tipo.component.css' ]
})
export class TipoComponent {

  @Input() tipo;
  @Input() clase;
  @Input() imagen;
  constructor( public _tipo: TipoFileService ) { }

}

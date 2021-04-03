import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ArchivoModel } from 'src/app/model/archivo.model';
import { FolderModel } from 'src/app/model/folder.model';
import { TipoFileService } from '../../services/tipo-file.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  opened = false;
  @ViewChild( 'sidebar' ) elemento: ElementRef;
  @Input() archivo: any  =  {}


  constructor(public _tipo: TipoFileService) { }

  ngOnInit(): void {
  }


  side( ) {
  
    if( !this.opened ) {
      this.abrir( );
    }else{
      this.cerrar( );
    }
  }

  abrir( ) {
    this.elemento.nativeElement.classList.add('abrir');
    this.elemento.nativeElement.classList.add('animate__bounceInRight');
    this.elemento.nativeElement.classList.remove('animate__fadeOutRight');
    this.opened = true;
  }

  cerrar( ) {
    this.elemento.nativeElement.classList.add('animate__fadeOutRight');
    this.elemento.nativeElement.classList.remove('animate__bounceInRight');
    this.opened = false;
  }

  cerrarDblCLick() {
    this.elemento.nativeElement.classList.remove('animate__bounceInRight');
    this.elemento.nativeElement.classList.remove('abrir');
    this.opened = false;
  }


  prevent(e) {
    e.preventDefault();
  }


  calcularPeso(archivos: any[]) {
    let suma = 0;
    archivos.forEach(archivo => suma+=archivo.peso);
    return suma / 1024;
  }

}

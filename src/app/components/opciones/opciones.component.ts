import { Component, ElementRef, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent {

  @Input() timePeriods;
  colores: any[] = [ 'warn', 'primary', 'accent' ]
  carpeta;
  index: number = 0;

  @Output() verDetalles: EventEmitter<boolean> = new EventEmitter();
  @Output() cerrarDetalles: EventEmitter<boolean> = new EventEmitter();
  @ViewChild( MatMenuTrigger ) contextMenu: MatMenuTrigger;
  
  contextMenuPosition = { x: '0px', y: '0px' };
  constructor(private el: ElementRef) { }


  seleccionar(drag){
    
    const listas = this.el.nativeElement.querySelector('.example-list')
    const cantidad = listas.childElementCount
    for (let i = 0; i < cantidad; i++) {
      listas.children[i].classList.remove("example-drag")
    }

    drag.classList.add("example-drag")
  }


  detalles() {
    this.verDetalles.emit();
  }

  
 
  opciones(drag, i: number) {
    this.carpeta = drag;
    this.index = i;
    this.contextMenuPosition.x = drag.offsetLeft + 'px';
    this.contextMenuPosition.y = drag.offsetTop + drag.offsetHeight +'px';
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
    this.seleccionar(drag);
    this.cerrarDetalles.emit();
  }


  eliminar() {
   
    this.carpeta.classList.add("animate__bounceOutDown")
    setTimeout(()=> {
      this.timePeriods.splice(this.index, 1);
    }, 900)
  }

}

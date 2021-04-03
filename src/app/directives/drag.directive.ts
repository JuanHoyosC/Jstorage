import { Directive, HostListener, Output, Input, EventEmitter, ElementRef } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { FolderModel } from '../model/folder.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @Input() archivos: FolderModel[] = [];
  @Input() carpeta: any;
  @Output() estaSobre: EventEmitter<boolean> = new EventEmitter();
  @Input() obtener = true;
  @Output() puedePasar: EventEmitter<any> = new EventEmitter();

  constructor(private el: ElementRef, private _crud: CrudService, private _snackBar: MatSnackBar) { 
    
  }


  @HostListener('dragover', ['$event'])
  public onDragEnter(evento: any) {
    this.el.nativeElement.classList.add("example-drag")
    this._prevenirDetener( evento );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evento: any) {
    this.el.nativeElement.classList.remove("example-drag")
  }

  @HostListener('change', ['$event'])
  public onChange(evento: any) {
    this._extraerArchivos(evento.target.files);
    this._prevenirDetener( evento );
  }


  @HostListener('drop', ['$event'])
  public onDrop(evento: any) {
    this.el.nativeElement.classList.remove("example-drag")
    const transferencia = this._getTransferencia( evento );

    this._prevenirDetener( evento );
    if(!this.obtener) {
      this.puedePasar.emit();
      return ;
    }

    if( !transferencia ) return false;

    this._extraerArchivos(transferencia.files);
    this._prevenirDetener( evento );
    this.el.nativeElement.classList.remove("example-drag")
  }


  private _getTransferencia( evento: any ) {
    return evento.dataTransfer ? evento.dataTransfer : evento.originalEvent.dataTransfer;
  }


  private _extraerArchivos (fileList: FileList) {

    for (const file  in fileList) {
      if(parseInt(file) || parseInt(file) === 0){
        const archivoFile = fileList[file+''];
        if(this._archivoPuedeSerCargado(archivoFile)){
          this.archivos.push(archivoFile)
        }
      }
    }


    if(this.archivos.length === 0) return ;

    this._crud.agregarArchivos(this.carpeta, this.archivos);
    this.archivos = [];

  }
  
  //Validaciones 

  private _archivoPuedeSerCargado(archivo: File): boolean {
    if( !this._archivoYaDroppeado(archivo.name) && !this._archivoYaDroppeadoCarpeta(archivo.name)
      && archivo.type !== "") return true;
    return false;
  }

  private _prevenirDetener( evento ) {
    evento.preventDefault();
    evento.stopPropagation();
  }

  private _archivoYaDroppeado(nombreArchivo: string): boolean {
    for (let archivo of this.archivos) {
      if(nombreArchivo === archivo['name']){
        return true;
      }
    }

    return false;
  }

  private _archivoYaDroppeadoCarpeta(nombreArchivo: string): boolean {
    for (let archivo of this.carpeta.archivos) {
      if(nombreArchivo === (archivo.nombre + '.' + archivo.tipo)){
        this.openSnackBar(`Algunos archivos ya se encuentra en la carpeta`, 'cerrar')
        return true;
      }
    }

    return false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}

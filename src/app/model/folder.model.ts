import { ArchivoModel } from './archivo.model';

export class FolderModel {
    nombre: string;
    tipo: string = 'Carpeta';
    ubicacion: string = "Mi unidad";
    fecha: number;
    peso: number = 0;
    color: string;
    archivos: ArchivoModel[] = [];


    constructor(nombre: string, color: string) {
        this.nombre = nombre;
        this.color = color;
        this.fecha = Date.now();
    }
}
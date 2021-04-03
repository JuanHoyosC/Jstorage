export class ArchivoModel {
    nombre: string;
    tipo: string;
    ubicacion: string;
    fecha: number;
    peso: number;
    url: string;
    progreso: number;
    path: string;


    constructor(nombre: string, tipo: string, ubicacion: string, peso: number) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.ubicacion = ubicacion;
        this.peso = peso;
        this.fecha = Date.now();
    }
}
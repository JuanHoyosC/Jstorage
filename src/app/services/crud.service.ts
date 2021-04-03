import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UsuarioModel } from '../model/usuario.model';
import { FolderModel } from '../model/folder.model';
import { AngularFireStorage } from 'angularfire2/storage';
import { ArchivoModel } from '../model/archivo.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { saveAs } from 'file-saver'


@Injectable({
  providedIn: 'root'
})

export class CrudService {

  private usuariosCollection: AngularFirestoreCollection<UsuarioModel>;
  usuario: UsuarioModel = new UsuarioModel();
  folders: FolderModel[] = [];
  archivos: ArchivoModel[] = [];

  private cant$ = new Subject<number>();

  constructor(public afAuth: AngularFireAuth, private storage: AngularFireStorage, private afs: AngularFirestore, private _snackBar: MatSnackBar) {
    this.afAuth.authState.subscribe((user: any) => {
      if (!user) return;
      this.limpiar();
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
      this.usuario.foto = user.photoURL;
      this.usuariosCollection = afs.collection<UsuarioModel>('usuarios',
        ref => ref.where('uid', '==', this.usuario.uid));
      this.usuariosCollection.valueChanges().subscribe((usuario: any) => {
        if (usuario[0]) {
          this.usuario = usuario[0];
          this.folders = usuario[0].folders
        }
      })
    })
  }

  crearCarpeta(value) {
    const folder = new FolderModel(value.nombre, value.colores);
    if (this.usuario.folders.find(folder => folder.nombre === value.nombre.trim())) {
      return new Promise((resolve, reject) => {
        resolve({ mensaje: `La carpeta ${value.nombre} ya existe` });
      })
    }

    this.usuario.folders.push(folder);
    const folders = []
    this.usuario.folders.forEach(el => folders.push({ ...el }));
    const usuario = {
      nombre: this.usuario.nombre.trim(),
      foto: this.usuario.foto,
      uid: this.usuario.uid,
      folders: folders
    }

    return this.usuariosCollection.doc(this.usuario.uid).set(usuario);
  }

  actualizarCarpeta() {
    return this.usuariosCollection.doc(this.usuario.uid).update({ folders: this.folders })
  }



  agregarArchivos(carpeta: FolderModel, archivos: any[]) {
    for (const archivo of archivos) {
      let tipo = archivo.name.split('.');
      tipo = tipo[tipo.length - 1];
      const archivoUpload = new ArchivoModel(archivo.name.replace(`.${tipo}`, ''), tipo, carpeta.nombre, archivo.size);
      this.archivos.push(archivoUpload);
      const file = archivo
      if (archivoUpload.progreso >= 100) continue;
      const filePath = `${this.usuario.uid}/${carpeta.nombre}-${archivo.name.split(' ').join('')}`;

      const task = this.storage.upload(filePath, file);

      task.percentageChanges().subscribe(data => {
        archivoUpload.progreso = data;
        if (data >= 100) {
          archivoUpload.progreso = 100;
          //const ref = this.storage.ref(filePath);
          task.then(res => res.ref.getDownloadURL().then(data => {
            archivoUpload.url = data;
            archivoUpload.path = `${this.usuario.uid}/${carpeta.nombre}-${archivo.name.split(' ').join('')}`;
            //Los guarda en el folder y actualiza la db
            carpeta.archivos.push({ ...archivoUpload })
            const index = this.folders.findIndex(folder => folder.nombre === carpeta.nombre
              && folder.fecha === carpeta.fecha && folder.color === carpeta.color)
            this.folders.splice(index, 1, carpeta);

            this.actualizarCarpeta().then()


          }))
        }


      });
    }

  }

  obtenerCarpeta(nombre: string) {
    return this.afAuth.authState.pipe(map(res => {

      if (!res) return [];
      const data = this.afs.collection<UsuarioModel>('usuarios',
        ref => ref.where('uid', '==', res.uid)).valueChanges().pipe(map(data => {
          if (!data[0]) return [];
          return data[0].folders.filter(folder => folder.nombre.replace(/ /g, '-') === nombre);
        }))

      return data;
    }));


  }

  buscador(busqueda: string) {
    const archivos = [];
    this.folders.forEach(folder => {
      folder.archivos.forEach(archivo => {
        if (archivo.nombre.toLocaleLowerCase().trim().includes(busqueda.toLocaleLowerCase().trim())) {
          archivos.push(archivo);
        }
      })
    })

    return archivos;
  }

  cambiarNombre(data, nombre: string) {
    if (data.nombre === nombre.trim()) {
      return new Promise((resolve, reject) => {
        resolve({ mensaje: 'La carpeta tiene el mismo nombre' });
      })
    }

    if (this.usuario.folders.find(folder => folder.nombre === nombre.trim())) {
      return new Promise((resolve, reject) => {
        resolve({ mensaje: 'La carpeta ya existe' });
      })
    }


    data.nombre = nombre;

    return this.actualizarCarpeta();
  }

  borrarArchivo(archivos: any[], index) {
    this.storage.ref(archivos[index].path).delete().subscribe(res => {
      const i = this.folders.findIndex(folder => folder.nombre === archivos[index].ubicacion);
      archivos.splice(index, 1);
      this.folders[i].archivos = archivos;
      this.actualizarCarpeta().then();
    });
  }

  mover(folder, archivo, i) {
    if (folder.nombre === archivo.ubicacion) return;
    const pasar = folder.archivos.some(a => a.nombre === archivo.nombre);
    if (!pasar) {
      const index = this.folders.findIndex(folder => folder.nombre === archivo.ubicacion)
      archivo.ubicacion = folder.nombre;
      folder.archivos.push(archivo);
      this.folders[index].archivos.splice(i, 1);
      this.actualizarCarpeta().then(() => {
        this._snackBar.open('Movido con exito', 'cerrar', { duration: 2000, });
      });
    } else {
      this._snackBar.open('Archivos repetidos', 'cerrar', { duration: 2000, });
    }
  }

  descargarArchivo(path) {

    this.storage.ref(path).getDownloadURL().subscribe(function (url) {
      // `url` is the download URL for 'images/stars.jpg'
      console.log(url)
      // This can be downloaded directly:
      saveAs(url, "hello world.png");

    })
  }

  borrarCarpeta({ archivos }) {
    let suma = 0;
    this.cant$.next(0);
    archivos.forEach((archivo) => {
      this.storage.ref(archivo.path).delete().subscribe(res => this.cant$.next(suma++));
    })

    return this.cant$

  }

  limpiar() {
    this.usuario = new UsuarioModel();
    this.folders = [];
    this.archivos = [];
  }

}

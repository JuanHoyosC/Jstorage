import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import Swal from 'sweetalert2'
import { UsuarioModel } from '../model/usuario.model';
import { CrudService } from 'src/app/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuariosCollection: AngularFirestoreCollection<UsuarioModel>;


  constructor(public afAuth: AngularFireAuth, private route: Router, 
            private afs: AngularFirestore, private storage: AngularFireStorage, private _crud: CrudService) {}

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
      this.route.navigateByUrl('/home');
    }).catch(error => {})
  }

  login(usuario: any) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(usuario.correo, usuario.password)
      .then(() => this.route.navigateByUrl('/home'))
      .catch(() => this.mensajeError('Correo o contraseña incorrecta'))
  }

  nuevoUsuario(usuario: any, file) {
    const newUser: UsuarioModel = new UsuarioModel();
    const { correo, password, nombre } = usuario;
    this.afAuth.auth.createUserWithEmailAndPassword(correo, password).then(({ user }) => {
      newUser.nombre = nombre.trim();
      newUser.uid = user.uid;
      const task = this.storage.upload(`${user.uid}/fotodeperfil`, file);
      task.then(res => res.ref.getDownloadURL().then(data => {
        newUser.foto = data;
        this.usuariosCollection = this.afs.collection<UsuarioModel>('usuarios');
        this.usuariosCollection.doc(newUser.uid).set({ ...newUser }).then(res => {
          this.mensajeSuccess('Usuario creado');
          this.logout('si');
        })
      }));
    }).catch(() => this.mensajeError('El usuario ya existe'));
  }


  logout(login: string = 'no') {
    this.afAuth.auth.signOut();
    //Limpia los datos
    this._crud.limpiar();
    if (login === 'si') { this.route.navigateByUrl('/login'); return; };
    this.route.navigateByUrl('/landing');
  }


  isLogged() {
    return this.afAuth.authState
  }

  mensajeError(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje
    })
  }

  mensajeSuccess(mensaje: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: mensaje,
      showConfirmButton: true
    })
  }

}

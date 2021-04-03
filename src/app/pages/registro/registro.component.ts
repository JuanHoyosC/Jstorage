import { Component  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  hide = true;
  forma: FormGroup;
  password: string = '';
  file: File;
  constructor(public _auth: AuthService, private fb: FormBuilder) { 
    this.crearFormulario()
  }

  crearFormulario() {

    this.forma = this.fb.group({
      correo  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      nombre  : ['', [Validators.required, Validators.maxLength(10), Validators.minLength(5)] ],
      password   : ['', [Validators.required, Validators.minLength(6)] ],
      password2   : ['', [Validators.required, Validators.minLength(6)] ],
      file   : ['', [Validators.required ]]
    });

  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get passNoValido() {
    this.password = this.forma.get('password').value
    return this.forma.get('password').invalid && this.forma.get('password').touched
  }

  get passNoValido2() {
    return (this.forma.get('password2').invalid && this.forma.get('password2').touched) || ( this.forma.get('password2').touched && this.forma.get('password2').value !== this.password)
  }

  get fileNoValido() {
    return this.forma.get('file').invalid && this.forma.get('file').touched
  }


  fileChangeEvent(files, spanFile) {
    spanFile.innerText = files[0].name
    this.file = files[0];
  }

  registrarse() {
    if(!this.forma.valid) return ;
    console.log(this.forma.value)
    this._auth.nuevoUsuario(this.forma.value, this.file);

  }

}

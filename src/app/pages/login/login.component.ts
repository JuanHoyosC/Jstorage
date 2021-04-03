import { Component  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  hide = true;
  forma: FormGroup;
  constructor(public _auth: AuthService, private fb: FormBuilder) { 
    this.crearFormulario()
  }

  crearFormulario() {

    this.forma = this.fb.group({
      correo  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      password   : ['', [Validators.required, Validators.minLength(6)] ]
    });

  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  get passNoValido() {
    return this.forma.get('password').invalid && this.forma.get('password').touched
  }

  ingresar() {
    if(this.forma.invalid) return ;
    console.log(this.forma.value);
    this._auth.login( this.forma.value );
  }
}

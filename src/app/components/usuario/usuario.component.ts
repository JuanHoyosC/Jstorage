import { Component, Input  } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  @Input() clase: string = '';
  @Input() clase2: string = '';

  constructor(public _auth: AuthService, private _route: Router, public _crud: CrudService) { }

  irA() {
    this._route.navigateByUrl('/login');
  }
}

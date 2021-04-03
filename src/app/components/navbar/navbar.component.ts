import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  showFiller = false;

  @ViewChild( MatDrawer ) matDrawer;
  @ViewChild( 'search') search: SearchComponent;

  archivos: any[] = [];

  constructor(public _auth: AuthService, private _route: Router, public _crud: CrudService) { }


  limpiar() {
    this.search.value = '';
    this.archivos = [];
  }

  close() {
    this.matDrawer.close();
    this.limpiar();
  }

  irA( archivo ) {
    const ruta = `${archivo.ubicacion.replace(/ /, '-')}/${ archivo.nombre.replaceAll(' ', '-') }.${ archivo.tipo }`;
    this._route.navigateByUrl(`carpetas/${ruta}`);
    this.close();
  }

  home() {
    if(this._crud.usuario.nombre) { this._route.navigateByUrl('/home'); return ; }
    this._route.navigateByUrl('/login');
  }



}

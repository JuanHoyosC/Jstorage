import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-name-ruta',
  templateUrl: './name-ruta.component.html',
  styleUrls: ['./name-ruta.component.css']
})
export class NameRutaComponent  {

  ruta: string = '';
  constructor(private _router: Router, private _active: ActivatedRoute) {
    this._active.paramMap.subscribe((res: any) => {
      if(!res.get('nombre')) { this.ruta = 'home'; return ; }
      this.ruta = res.get('archivo') ? `carpetas>!${res.get('nombre')}>!${res.get('archivo')}` : `carpetas>!${res.get('nombre')}`
    }) 
  }


  rutas(value): String[]{ 
    return value.split('>!');
  }

  irFolder( ruta ) {
    this._router.navigateByUrl(`carpetas/${ ruta.replace(/ /, '-') }`);
  }



}

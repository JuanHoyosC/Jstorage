import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) { }
  canActivate(): Observable<boolean> | boolean {

    return this._auth.isLogged().pipe(map((user: any) => {
      if (!user) return true;
      this._router.navigateByUrl('/home');
      return false;
    }));

  }
}

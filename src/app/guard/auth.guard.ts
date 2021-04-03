import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService, private _router: Router) { }
  canActivate(): Observable<boolean> | boolean {

    return this._auth.isLogged().pipe(map((user: any) => {
      if (user) return true;
      this._router.navigateByUrl('/login');
      return false;
    }));

  }



}

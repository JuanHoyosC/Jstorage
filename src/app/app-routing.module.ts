import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/pages/home/home.component';
import { FolderComponent } from '../app/pages/folder/folder.component';

import { LoginComponent } from '../app/pages/login/login.component'
import { RegistroComponent } from './pages/registro/registro.component';

import { LandingComponent } from './pages/landing/landing.component';

//guard
import { AuthGuard } from './guard/auth.guard';
import { AuthLoginGuard } from './guard/auth-login.guard';


const routes: Routes = [
  {path: 'carpetas/:nombre', component: FolderComponent, canActivate: [AuthGuard]},
  {path: 'carpetas/:nombre/:archivo', component: FolderComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'landing', component: LandingComponent},
  {path: 'login', component: LoginComponent, canActivate: [AuthLoginGuard]},
  {path: 'registro', component: RegistroComponent, canActivate: [AuthLoginGuard]},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

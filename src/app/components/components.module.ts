import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


//Componentes
import { AgregarComponent } from './agregar/agregar.component';
import { DialogElementsAgregar } from './agregar/agregar.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { DialogElementsNombre } from './drag-drop/drag-drop.component';
import { NotFileComponent } from './not-file/not-file.component';
import { NameRutaComponent } from './name-ruta/name-ruta.component';
import { SearchComponent } from './search/search.component';
import { FileCargandoComponent } from './file-cargando/file-cargando.component';
import { CanecaComponent } from './caneca/caneca.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { DetallesComponent } from './detalles/detalles.component';
import { DialogElementsExample, ModalVistaComponent } from './modal-vista/modal-vista.component';
import { NotFileFolderComponent } from './not-file-folder/not-file-folder.component';
import { AgregarArchivosComponent } from './agregar-archivos/agregar-archivos.component';
import { OpcionesComponent } from './opciones/opciones.component';
import { NavbarComponent } from './navbar/navbar.component';

import { MaterialModule } from '../material.module';

// pages
import { HomeComponent } from '../pages/home/home.component';
import { DragDirective } from '../directives/drag.directive';
import { RutasPipe } from '../pipes/rutas.pipe';
import { FolderComponent } from '../pages/folder/folder.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegistroComponent } from '../pages/registro/registro.component';
import { FechaPipe } from '../pipes/fecha.pipe';
import { TipoPipe } from '../pipes/tipo.pipe';
import { TipoComponent } from './tipo/tipo.component';
import { UsuarioComponent } from './usuario/usuario.component';


@NgModule({
    declarations: [ 
        NavbarComponent,
        AgregarComponent,
        DragDropComponent,
        NotFileComponent,
        NameRutaComponent,
        SearchComponent,
        FileCargandoComponent,
        CanecaComponent,
        ArchivosComponent,
        DetallesComponent,
        ModalVistaComponent,
        NotFileFolderComponent,
        AgregarArchivosComponent,
        OpcionesComponent,
        HomeComponent,
        DragDirective,
        RutasPipe,
        FolderComponent,
        LoginComponent,
        RegistroComponent,
        DialogElementsAgregar,
        DialogElementsNombre,
        FechaPipe,
        DialogElementsExample,
        TipoPipe,
        TipoComponent,
        UsuarioComponent],
    imports: [ MaterialModule, RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
    exports: [
        NavbarComponent,
        AgregarComponent,
        DragDropComponent,
        NotFileComponent,
        NameRutaComponent,
        SearchComponent,
        FileCargandoComponent,
        CanecaComponent,
        ArchivosComponent,
        DetallesComponent,
        ModalVistaComponent,
        NotFileFolderComponent,
        AgregarArchivosComponent,
        OpcionesComponent,
        HomeComponent,
        DragDirective,
        RutasPipe,
        FolderComponent,
        LoginComponent,
        RegistroComponent,
        DialogElementsAgregar,
        DialogElementsExample,
        DialogElementsNombre
     ],
    providers: [],
})
export class ComponentsModule {}
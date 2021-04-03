import { FolderModel } from './folder.model';
export class UsuarioModel {
    uid: string;
    nombre: string;
    foto: string;
    folders: FolderModel[] = [];
}
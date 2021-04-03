import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoFileService {

  constructor() { }
  videos: string[] = ['mp4', 'webm', 'avi']
  imagenes: string[] = ['png', 'jpg', 'jpeg', 'svg', 'gif'];
  audios: string[] = ['mp3', 'aac', 'ogg', 'opus', 'flac'];


  aceptarImagen(tipo) { 
    return this.imagenes.some(imagen => imagen === tipo);
  }

  aceptarVideo(tipo) { 
    return this.videos.some(video => video === tipo);
  }

  aceptarMusica(tipo) { 
    return this.audios.some(audio => audio === tipo);
  }

  aceptarNot( tipo ) {
    if(this.audios.some(audio => audio === tipo )) return false;
    if(this.imagenes.some(imagen => imagen === tipo ))  return false;
    if(this.videos.some(video => video === tipo ))  return false;
    return true;
  }

}

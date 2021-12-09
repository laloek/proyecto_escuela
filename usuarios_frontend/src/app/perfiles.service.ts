import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Perfiles } from './perfiles';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  constructor(private http: HttpService) { }

  public async eliminarPerfil(perfiles: Perfiles) {
    return await this.http.post("/eliminar", perfiles);
  }

  public async agregarPerfiles(perfiles: Perfiles) {
    return await this.http.post("/agregarperfil", perfiles)
  }
  public async modificarPerfiles(perfiles: Perfiles) {
    return await this.http.post("/modificarperfil", perfiles)
  }
  public async obtenerPerfiles(perfiles: Perfiles) {
    return await this.http.post("/perfiles", perfiles);
  }
  public async obtenerPerfil(perfiles: Perfiles) {
    return await this.http.post("/perfil", perfiles);
  }
  public async agregarFotosDeProducto(fotos: FormData) {
    return await this.http.formdata("/fotos_usuarios", fotos);
  }
}

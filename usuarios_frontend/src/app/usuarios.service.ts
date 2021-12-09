import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { HttpService } from './http.service';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpService) { }


  public async obtenerUsuarios(){
    return await this.http.get("/usuarios");
  }
  
  public async eliminarUsuario(usuario: Usuario) {
    return await this.http.post("/eliminarusuario", usuario);
  }

  public async agregarUsuario(usuario: Usuario) {
    return await this.http.post("/usuario", usuario)
  }
  public async modificarUsuario(usuario: Usuario) {
    return await this.http.post("/modificarusuario", usuario)
  }
  public async obtenerUsuario(usuario: Usuario) {
    return await this.http.post("/usuarioporid", usuario);
  }
}

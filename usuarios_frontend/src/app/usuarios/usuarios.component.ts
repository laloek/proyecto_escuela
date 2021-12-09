import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataSharingService } from '../data-sharing.service';
import { Usuario } from '../usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private dataSharing: DataSharingService, private usuariosService: UsuariosService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  public usuarios: any;

  async ngOnInit(): Promise<any> {
    this.usuarios = await this.usuariosService.obtenerUsuarios();
    console.log(this.usuarios);
  }
  guardarusuario(idUsuario:number) {
    environment.usuario = idUsuario;
    console.log(environment);
  }
  async eliminar(usuario: Usuario) {
    await this.usuariosService.eliminarUsuario(usuario)
    this.router.navigate(['/usuarios']);
  } 
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataSharingService } from '../data-sharing.service';
import { Perfiles } from '../perfiles';
import { PerfilesService } from '../perfiles.service';
import { Usuario } from '../usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {

  constructor(private dataSharing: DataSharingService, private perfilesService: PerfilesService, private usuarioService: UsuariosService, private activatedRoute: ActivatedRoute, private router: Router) { this.router.routeReuseStrategy.shouldReuseRoute = () => false;}

  perfiles: Perfiles[] = [];
  usuarios: Usuario[] = [];
  async ngOnInit(): Promise<any> {
    this.mostrarinfo();
  }

  async mostrarinfo() {
    const usuario = new Usuario(parseInt(this.activatedRoute.snapshot.paramMap.get("id")!), '', '', '', 0, '')
    const id = new Perfiles(0, '', '', 0, parseInt(this.activatedRoute.snapshot.paramMap.get("id")!), 0, 0, "", "", "","")
    this.perfiles = await this.perfilesService.obtenerPerfiles(id);
    this.usuarios = await this.usuarioService.obtenerUsuario(usuario);
    environment.usuario = this.perfiles[0].idUsuario;
  }
  async eliminar(perfil: Perfiles) {
    this.perfiles = await this.perfilesService.eliminarPerfil(perfil);
    this.mostrarinfo();
    this.recargar();
  }
  public recargar() {
    this.router.navigate(['perfiles/' + this.perfiles[0].idUsuario]);
  }
}

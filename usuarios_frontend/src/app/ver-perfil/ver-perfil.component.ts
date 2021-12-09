import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataSharingService } from '../data-sharing.service';
import { Perfiles } from '../perfiles';
import { PerfilesService } from '../perfiles.service';
import { Usuario } from '../usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent implements OnInit {

  constructor(private dataSharing: DataSharingService, private perfilesService: PerfilesService, private usuariosService: UsuariosService, private activatedRoute: ActivatedRoute) { }

  auxperfil: Perfiles[] = [];
  auxusuario: Usuario[] = [];
  public usuario = new Usuario(0, "", "", "", 0, "");
  public perfil = new Perfiles(0, "", "", 0, 0, 0, 0, "", "", "","");
  async ngOnInit(): Promise<any> {
    const idPerfil = parseInt(this.activatedRoute.snapshot.paramMap.get("id")!);
    const idp = new Perfiles(idPerfil, '', '', 0, 0, 0, 0, "", "", "","")
    this.auxperfil = await this.perfilesService.obtenerPerfil(idp);
    this.perfil = this.auxperfil[0];
    const idu = new Usuario(this.perfil.idUsuario, "", "", "", 0, "")
    this.auxusuario = await this.usuariosService.obtenerUsuario(idu);
    this.usuario = this.auxusuario[0];
    
  }
  public resolverFoto(foto: string) {
    const baseUrl = environment.imagenUrl;
    return `${baseUrl}fotos_usuarios/${foto}`;
  }

}

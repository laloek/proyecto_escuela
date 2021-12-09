import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-mod-usuario',
  templateUrl: './mod-usuario.component.html',
  styleUrls: ['./mod-usuario.component.css']
})
export class ModUsuarioComponent implements OnInit {
  public usuarios = new Usuario(0, "", "", "", 0, "")
  aux: Usuario[] = [];
  constructor(private usuariosService: UsuariosService, private snackbar: MatSnackBar, private activatedRoute: ActivatedRoute, private router: Router) { }

  async ngOnInit(): Promise<any> {
    const idPerfil = parseInt(this.activatedRoute.snapshot.paramMap.get("id")!);
    const id = new Usuario(idPerfil, "", "", "", 0, "")
    this.aux = await this.usuariosService.obtenerUsuario(id);
    this.usuarios = this.aux[0];
  }
  async guardar() {
    if (!this.usuarios.nombre) {
      return alert("Escribe tu nombre");
    }
    if (!this.usuarios.apellidoP) {
      return alert("Escribe apellido paterno");
    }
    if (!this.usuarios.apellidoM) {
      return alert("Escribe apellido materno");
    }
    if (!this.usuarios.edad) {
      return alert("Escribe tu edad");
    }
    if (!this.usuarios.ubicacion) {
      return alert("Escribe tu ubicacion");
    }
    if (!this.usuarios.idUsuario) {
      return alert("Error de id");
    }
    this.regresar();
    await this.usuariosService.modificarUsuario(this.usuarios);
    
  }
  public regresar() {
    this.router.navigate(["/usuarios"], { relativeTo: this.activatedRoute });
  }
}

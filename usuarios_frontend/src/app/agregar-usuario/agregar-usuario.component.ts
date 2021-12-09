import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {

  public usuarios=new Usuario(0,"","","",0,"")
  constructor(private usuariosService: UsuariosService, private snackbar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  async guardar() {
    if (!this.usuarios.nombre) {
      return alert("Escribe tu nombre");
    }
    if (!this.usuarios.apellidoP) {
      return alert("Escribe apellido paterno");
    }
    if (!this.usuarios.apellidoM) {
      return alert("Escribe apellido paterno");
    }
    if (!this.usuarios.edad) {
      return alert("Escribe tu edad");
    }
    if (!this.usuarios.ubicacion) {
      return alert("Escribe tu ubicacion");
    }
    await this.usuariosService.agregarUsuario(this.usuarios);
    this.regresar();
  }
  public regresar() {
    this.router.navigate(["/usuarios/"], { relativeTo: this.route });
  }
}

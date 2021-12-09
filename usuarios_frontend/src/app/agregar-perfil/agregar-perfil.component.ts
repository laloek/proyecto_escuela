import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Perfiles } from '../perfiles';
import { PerfilesService } from '../perfiles.service';

@Component({
  selector: 'app-agregar-perfil',
  templateUrl: './agregar-perfil.component.html',
  styleUrls: ['./agregar-perfil.component.css']
})
export class AgregarPerfilComponent implements OnInit {

  public perfiles = new Perfiles(0, "", "", 0, 0, 0, 0,"","","","");

  @ViewChild("foto", {
    read: ElementRef
  }) foto: ElementRef | undefined;
  public cargando = false;
  constructor(private perfilesService: PerfilesService, private snackbar: MatSnackBar, private route: ActivatedRoute,private router: Router) { }
  public idUsuario:number=0;
  ngOnInit(): void {
    console.log("Usuario " + environment.usuario);
    this.idUsuario=environment.usuario;
  }
  async guardar() {
    this.perfiles.idUsuario = this.idUsuario;
    if (!this.perfiles.titulo) {
      return alert("Escribe un titulo");
    }
    if (!this.perfiles.acerca) {
      return alert("Escribe el acerca de");
    }
    let archivos = this.foto!.nativeElement.files;
    if (!archivos.length) {
      return alert("Selecciona al menos una foto");
    }
    const idProductoGuardado = await this.perfilesService.agregarPerfiles(this.perfiles);
    const fd = new FormData();
    for (let x = 0; x < archivos.length; x++) {
      fd.append(`foto_${x}`, archivos[x])
    }
    fd.append("idPerfil", idProductoGuardado);
    const respuesta = await this.perfilesService.agregarFotosDeProducto(fd);

    this.foto!.nativeElement.value = "";
    this.regresar();
  }
  public regresar() {
    this.router.navigate(["/perfiles/" + this.idUsuario], { relativeTo: this.route });
  }

}

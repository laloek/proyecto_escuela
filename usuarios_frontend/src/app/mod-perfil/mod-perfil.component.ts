import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Perfiles } from '../perfiles';
import { PerfilesService } from '../perfiles.service';

@Component({
  selector: 'app-mod-perfil',
  templateUrl: './mod-perfil.component.html',
  styleUrls: ['./mod-perfil.component.css']
})
export class ModPerfilComponent implements OnInit {

  constructor(private perfilesService: PerfilesService, private snackbar: MatSnackBar, private activatedRoute: ActivatedRoute, private router: Router) { }
  public perfiles = new Perfiles(15, "", "", 0, 0, 0, 0, "", "", "","");
  aux: Perfiles[] = [];
  modfoto = true;
  @ViewChild("foto", {
    read: ElementRef
  }) foto: ElementRef | undefined;
  public cargando = false;
  async ngOnInit(): Promise<any> {
    const idPerfil = parseInt(this.activatedRoute.snapshot.paramMap.get("id")!);
    const id = new Perfiles(idPerfil, '', '', 0, 0, 0, 0, "", "", "","")
    this.aux = await this.perfilesService.obtenerPerfil(id);
    this.perfiles = this.aux[0];
  }

  async guardar() {
    if (!this.perfiles.titulo) {
      return alert("Escribe un titulo");
    }
    if (!this.perfiles.acerca) {
      return alert("Escribe el acerca de");
    }
    let archivos = this.foto!.nativeElement.files;
    if (!archivos.length) {
      this.modfoto = false;
    }
    await this.perfilesService.modificarPerfiles(this.perfiles);
    if (this.modfoto) {
      const fd = new FormData();
      for (let x = 0; x < archivos.length; x++) {
        fd.append(`foto_${x}`, archivos[x])
      }
      fd.append("idPerfil",this.perfiles.idPerfil.toString());
      const respuesta = await this.perfilesService.agregarFotosDeProducto(fd);
      this.foto!.nativeElement.value = "";
    }
    this.regresar();
  }
  public regresar() {
    this.router.navigate(["/perfiles/" + this.perfiles.idUsuario], { relativeTo: this.activatedRoute });
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarPerfilComponent } from './agregar-perfil/agregar-perfil.component';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { ModPerfilComponent } from './mod-perfil/mod-perfil.component';
import { ModUsuarioComponent } from './mod-usuario/mod-usuario.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VerPerfilComponent } from './ver-perfil/ver-perfil.component';


const routes: Routes = [
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'modificarusuario/:id', component: ModUsuarioComponent },
  { path: 'agregarusuarios', component: AgregarUsuarioComponent },
  { path: 'perfiles/:id', component: PerfilesComponent },
  { path: 'perfil/:id', component: VerPerfilComponent },
  { path: 'agregarperfil', component: AgregarPerfilComponent },
  { path: 'modificarperfil/:id', component: ModPerfilComponent },
  { path: '', redirectTo: "/usuarios", pathMatch: "full"},
  { path: '**', redirectTo: "/usuarios"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

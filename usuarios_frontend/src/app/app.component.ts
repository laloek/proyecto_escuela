import { Component } from '@angular/core';
import { DataSharingService } from './data-sharing.service';
import { Usuario } from './usuario';
import { UsuariosService } from './usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FRONTEND';

  constructor(private dataSharing:DataSharingService){
    }

  public usuarioActual = 0;

  async ngOnInit(): Promise<any> {
  }

  
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

    p:number=1;
	usuarios: Observable<User[]>;
	nome:String;

	constructor(private usuarioService: UsuarioService) { }

	ngOnInit(): void {
		this.usuarioService.getUsuariosList().subscribe(data => {
			this.usuarios = data;
		});
	}
	deleteUsuario(id: Number) {
		this.usuarioService.deletarUsuario(id).subscribe(data => {
			console.log("Retorno do metodo delete:" + data);
			this.usuarioService.getUsuariosList().subscribe(data => {
			this.usuarios = data;
		});
			
		});

	}
	
	 consultarUser() {
    this.usuarioService.consultarUser(this.nome).subscribe(data => {
        this.usuarios = data;
    });
  }


}

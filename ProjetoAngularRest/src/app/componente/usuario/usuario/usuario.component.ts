import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Profissao } from 'src/app/model/profissao';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

    p:number=1;
	usuarios: Array<User[]>;
	nome:String;
	total:number;
	
	
	


	constructor(private usuarioService: UsuarioService) { }

	ngOnInit(): void {
		
		
		
		this.usuarioService.getUsuariosList().subscribe(data => {
			this.usuarios = data.content;
			this.total= data.totalElements;
		});
	}
	deleteUsuario(id: Number,index) {
		this.usuarioService.deletarUsuario(id).subscribe(data => {
			this.usuarios.splice(index,1);
			
			//console.log("Retorno do metodo delete:" + data);
			//this.usuarioService.getUsuariosList().subscribe(data => {
			//this.usuarios = data;
	//	});
			
		});

	}
	
	 
   carregarPagina(pagina) {


    if (this.nome !== '') {
      this.usuarioService.consultarUserPorPage(this.nome, (pagina - 1)).subscribe(data => {
        this.usuarios = data.content;
        this.total = data.totalElements;
      });
    }
    else {
      this.usuarioService.getUsuariosListPage(pagina - 1).subscribe(data => {
        this.usuarios = data.content;
        this.total = data.totalElements;
      });
    }

  }
  
  
  consultarUser() {

    if (this.nome === '') {
      this.usuarioService.getUsuariosList().subscribe(data => {
        this.usuarios = data.content;
        this.total = data.totalElements;
      });
    } else {

      this.usuarioService.consultarUser(this.nome).subscribe(data => {
        this.usuarios = data.content;
        this.total = data.totalElements;
      });
    }
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Telefone } from 'src/app/model/telefone';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User(); 
  telefone= new Telefone();

  constructor(private routerActive: ActivatedRoute,private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    let id = this.routerActive.snapshot.paramMap.get('id');
    if (id != null) {
     this.usuarioService.getUsuario(id).subscribe(data=>{
       this.usuario=data;
     });
    
  }
}
 salvarUser() {
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) {
      this.usuarioService.updateUsuario(this.usuario).subscribe(data => {
        this.novo();
        console.info("chamou update");
      });
    } else {
      this.usuarioService.salvarUsuario(this.usuario).subscribe(data =>{
        this.novo(); 
        console.info("chamou save");
      });
    }
  }
  
  novo (){
    this.usuario = new User();
    this.telefone= new Telefone();
  }
  
  deletarTelefone(id, i) {

    if (id == null) {
      this.usuario.telefones.splice(i, 1);
      return;
    }


    if (id !== null && confirm("Deseja remover?")) {

      this.usuarioService.removerTelefone(id).subscribe(data => {

        this.usuario.telefones.splice(i, 1);

      });
    }
  }
   addFone() {

    if (this.usuario.telefones === undefined) {
      this.usuario.telefones = new Array<Telefone>();
    }

    this.usuario.telefones.push(this.telefone);
    this.telefone = new Telefone();

  }
  

}
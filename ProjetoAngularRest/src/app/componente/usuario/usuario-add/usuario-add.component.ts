import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Telefone } from 'src/app/model/telefone';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Profissao } from 'src/app/model/profissao';


@Injectable()
export class FormateDateApater extends NgbDateAdapter<string>{

readonly DELIMITER ='/';

  fromModel(value: string | null): NgbDateStruct | null {
    if(value){
      let date = value.split(this.DELIMITER); // quebra a / para pegar a data por array
      return {day:parseInt(date[0],10), month: parseInt(date[1],10), year:parseInt(date[2],10)};
    }
    return null;
  }
  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }




@Injectable()
export class FormataData  extends NgbDateParserFormat{
  
  readonly DELIMITER ='/';
  
  
  parse(value:string) : NgbDateStruct |null{
    if(value){
      let date = value.split(this.DELIMITER); // quebra a / para pegar a data por array
      return {day:parseInt(date[0],10), month: parseInt(date[1],10), year:parseInt(date[2],10)};
    }
    return null;
  }
  }
  format(date: NgbDateStruct|null):string {
    return date ? validarData( date.day) + this.DELIMITER + validarData(date.month) + this.DELIMITER + validarData(date.year) : ''; // retorna a data na tela: ex 02/06/1990
  }
  
   toModel(date: NgbDateStruct | null): string | null {
    console.info(date);
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

  
  
}

function validarData(valor: any) {
  if(valor.tostring !== null && parseInt(valor) <= 9){
    return '0' + valor;
  }else{
    return valor;
  }

}



@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers:[
    {provide : NgbDateParserFormatter, useClass :FormataData}
    {provide: NgbDataAdapter , useClass : FormateDataAdapter}
  ]
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User(); 
  telefone= new Telefone();
  
  profissoes : Array<Profissao>;

  constructor(private routerActive: ActivatedRoute,private usuarioService: UsuarioService) { }

  ngOnInit(): void {
   
		this.usuarioService.getProfissaoList().subscribe(data => {
			this.profissoes = data.content;
			
		});
    
    
    
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
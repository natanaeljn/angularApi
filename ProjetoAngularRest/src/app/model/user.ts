import { Profissao } from "./profissao";
import { Telefone } from "./telefone";

export class User {
	id: number;
	login: String;
	senha: String;
	nome: String;
	cpf: String;
	dataNascimento: String;
	telefones: Array<Telefone>;
	profissao: Profissao = new Profissao();
	salario: DoubleRange;




}




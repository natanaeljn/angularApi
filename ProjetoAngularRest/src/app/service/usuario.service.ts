import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService {

	constructor(private http: HttpClient) {


	}

	updateUsuario(user): Observable<any> {
		return this.http.put<any>(AppConstants.baseUrl, user);
	}
	salvarUsuario(user): Observable<any> {
		return this.http.post<any>(AppConstants.baseUrl, user);
	}

	getUsuariosList(): Observable<any> {
		return this.http.get<any>(AppConstants.baseUrl);
	}
	getProfissaoList(): Observable<any> {
		return this.http.get<any>(AppConstants.basePath + 'profissao/');
	}
	
	
	
	getUsuariosListPage(pagina): Observable<any> {
		return this.http.get<any>(AppConstants.baseUrl + 'page/' + pagina);
	}
	
	getUsuario(id): Observable<any> {
		return this.http.get<any>(AppConstants.baseUrl + id);
	}


	deletarUsuario(id: Number): Observable<any> {
		return this.http.delete(AppConstants.baseUrl + id, { responseType: 'text' });
	}

	consultarUser(nome: String): Observable<any> {
		return this.http.get(AppConstants.baseUrl + "usuarioPorNome/" + nome);
	}
	consultarUserPorPage(nome: String, page: Number): Observable<any> {
		return this.http.get(AppConstants.baseUrl + "usuarioPorNome/" + nome + "/page/" + page);
	}
	
	removerTelefone(id:Number): Observable<any>{
		return this.http.delete(AppConstants.baseUrl + "removerfone/" + id, {responseType : 'text'});
	}
	

	usuarioAutenticado() {
		if (localStorage.getItem('token') != null && localStorage.getItem('token').toString().trim() != null) {
			return true;
		}
		else {
			return false;
		}
	}


}

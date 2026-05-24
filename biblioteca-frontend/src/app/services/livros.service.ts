import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../entity/categoria';
import { CriarLivroRequest, Livro } from '../entity/livro';
import { Emprestimo } from '../entity/emprestimo';

@Injectable({
  providedIn: 'root',
})
export class LivrosService {
  private API_URL = 'http://localhost:8080/api';
  private http = inject(HttpClient);
  constructor() {}

  getLivros(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.API_URL + '/livros');
  }

  criarLivro(requisicao: CriarLivroRequest): Observable<Livro> {
    return this.http.post<Livro>(this.API_URL + '/livros', requisicao);
  }

  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API_URL + '/categorias');
  }

  getEmprestimos(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(this.API_URL + '/emprestimos');
  }
}

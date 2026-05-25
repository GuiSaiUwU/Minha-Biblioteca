import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria, CriarCategoriaRequest } from '../entity/categoria';
import { CriarLivroRequest, Livro } from '../entity/livro';
import { CriarEmprestimoRequest, Emprestimo } from '../entity/emprestimo';

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

  criarCategoria(requisicao: CriarCategoriaRequest): Observable<Categoria> {
    return this.http.post<Categoria>(this.API_URL + '/categorias', requisicao);
  }

  excluirCategoria(categoriaId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/categorias/${categoriaId}`);
  }
  
  getEmprestimos(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(this.API_URL + '/emprestimos');
  }

  criarEmprestimo(requisicao: CriarEmprestimoRequest): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(this.API_URL + '/emprestimos', requisicao);
  }

  devolverEmprestimo(emprestimoId: number): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(`${this.API_URL}/emprestimos/${emprestimoId}/devolver`, {});
  }
}

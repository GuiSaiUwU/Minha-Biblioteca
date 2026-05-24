import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { map, Observable } from 'rxjs';
import { Emprestimo } from '../../entity/emprestimo';
import { Livro } from '../../entity/livro';
import { LivrosService } from '../../services/livros.service';
import { Atrasados } from './atrasados/atrasados';

@Component({
  selector: 'app-livros-dashboard',
  imports: [PanelModule, CardModule, AsyncPipe, DatePipe, DividerModule, Atrasados, TableModule],
  templateUrl: './livros-dashboard.html',
  styleUrl: './livros-dashboard.scss',
})
export class LivrosDashboard implements OnInit {
  private livrosService: LivrosService = inject(LivrosService);
  livros$: Observable<Livro[]> = this.livrosService.getLivros();
  emprestimos$: Observable<Emprestimo[]> = this.livrosService.getEmprestimos();
  ultimosEmprestimos$!: Observable<Emprestimo[]>;
  dataDeHoje = new Date();

  ngOnInit(): void {
    this.ultimosEmprestimos$ = this.emprestimos$.pipe(
      map((emprestimos) =>
        emprestimos /* sort só pra ter crtz */
          .sort(
            (a, b) => new Date(b.dataEmprestimo).getTime() - new Date(a.dataEmprestimo).getTime(),
          )
          .slice(0, 5),
      ),
    );
  }

  constructor() {}

  getEmprestimoBackground(emprestimo: Emprestimo): string {
    if (emprestimo.dataDevolucaoEfetiva !== null) {
      return 'color-mix(in srgb, var(--p-green-400) 12%, transparent)';
    }

    const hoje = new Date();
    const prevista = new Date(emprestimo.dataDevolucaoPrevista);

    return prevista > hoje
      ? 'color-mix(in srgb, var(--p-sky-400) 12%, transparent)'
      : 'color-mix(in srgb, var(--p-red-700) 12%, transparent)';
  }

  getEmprestimoStatus(emprestimo: Emprestimo): string {
    if (emprestimo.dataDevolucaoEfetiva !== null) {
      return 'Devolvido';
    }

    const hoje = new Date();
    const prevista = new Date(emprestimo.dataDevolucaoPrevista);

    return prevista > hoje ? 'Com previsão' : 'Atrasado';
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Emprestimo } from '../../../entity/emprestimo';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-atrasados',
  imports: [CardModule, DatePipe, DividerModule, TableModule],
  templateUrl: './atrasados.html',
  styleUrl: './atrasados.scss',
})
export class Atrasados implements OnInit {
  @Input() emprestimos$!: Observable<Emprestimo[]>;
  @Input() dataDeHoje!: Date;
  atrasados: Emprestimo[] = [];

  ngOnInit(): void {
    if (this.dataDeHoje == null) {
      this.dataDeHoje = new Date();
    }
    if (this.emprestimos$ == null) {
      console.warn('Atrasados: emprestimos não foi fornecido.');
      return;
    }

    this.emprestimos$.subscribe((emprestimos) => {
      this.atrasados = emprestimos.filter((emprestimo) => {
        if (emprestimo.dataDevolucaoEfetiva != null) {
          return false; // Já devolvido, não é atrasado
        }

        const dataEmprestimo = new Date(emprestimo.dataDevolucaoPrevista);
        return this.dataDeHoje > dataEmprestimo;
      });
    });
  }

  checarDiasAtrasados(emprestimo: Emprestimo): number {
    const dataPrevista = new Date(emprestimo.dataDevolucaoPrevista);
    const diffTime = this.dataDeHoje.getTime() - dataPrevista.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}

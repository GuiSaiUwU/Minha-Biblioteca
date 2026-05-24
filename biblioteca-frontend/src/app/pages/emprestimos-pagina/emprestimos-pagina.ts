import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Categoria } from '../../entity/categoria';
import { CriarEmprestimoRequest, Emprestimo } from '../../entity/emprestimo';
import { Livro, StatusEnum } from '../../entity/livro';
import { LivrosService } from '../../services/livros.service';

@Component({
  selector: 'app-emprestimos-pagina',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    DialogModule,
    FloatLabelModule,
    InputTextModule,
    SelectModule,
    TableModule,
    TagModule,
    DatePipe,
  ],
  templateUrl: './emprestimos-pagina.html',
  styleUrl: './emprestimos-pagina.scss',
})
export class EmprestimosPagina implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private livrosService: LivrosService = inject(LivrosService);

  mostrarFormulario = false;
  carregando = false;
  salvando = false;
  devolvendoEmprestimoId: number | null = null;
  mensagemErro = '';

  emprestimos: Emprestimo[] = [];
  livrosDisponiveis: Livro[] = [];
  categorias: Categoria[] = [];

  formulario: FormGroup = this.fb.group({
    livroId: [null, Validators.required],
    nomePessoa: ['', Validators.required],
    telefone: ['', Validators.required],
    dataDevolucaoPrevista: [this.getDataPrevistaPadrao(), Validators.required],
  });

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.carregando = true;
    this.mensagemErro = '';

    this.livrosService.getLivros().subscribe({
      next: (livros) => {
        this.livrosDisponiveis = livros.filter((livro) => livro.status === StatusEnum.DISPONIVEL);
        this.categorias = [];

        this.livrosService.getEmprestimos().subscribe({
          next: (emprestimos) => {
            this.emprestimos = emprestimos;
            this.carregando = false;
          },
          error: () => {
            this.mensagemErro = 'Não foi possível carregar os empréstimos.';
            this.carregando = false;
          },
        });
      },
      error: () => {
        this.mensagemErro = 'Não foi possível carregar os livros disponíveis.';
        this.carregando = false;
      },
    });
  }

  abrirFormulario(): void {
    this.formulario.reset({
      livroId: null,
      nomePessoa: '',
      telefone: '',
      dataDevolucaoPrevista: this.getDataPrevistaPadrao(),
    });
    this.mensagemErro = '';
    this.mostrarFormulario = true;
  }

  fecharFormulario(): void {
    this.mostrarFormulario = false;
  }

  realizarEmprestimo(): void {
    if (this.formulario.invalid || this.salvando) {
      this.formulario.markAllAsTouched();
      return;
    }

    const valores = this.formulario.getRawValue();
    const requisicao: CriarEmprestimoRequest = {
      livroId: Number(valores.livroId),
      nomePessoa: String(valores.nomePessoa ?? '').trim(),
      telefone: String(valores.telefone ?? '').trim(),
      dataDevolucaoPrevista: String(valores.dataDevolucaoPrevista),
    };

    this.salvando = true;
    this.mensagemErro = '';

    this.livrosService
      .criarEmprestimo(requisicao)
      .pipe(
        finalize(() => {
          this.salvando = false;
          window.location.reload();
        }),
      )
      .subscribe({
        next: () => {
          this.fecharFormulario();
          window.location.reload();
        },
        error: () => {
          this.mensagemErro = 'Não foi possível registrar o empréstimo.';
        },
      });
  }

  devolverEmprestimo(emprestimoId: number): void {
    if (this.devolvendoEmprestimoId !== null) {
      return;
    }

    this.devolvendoEmprestimoId = emprestimoId;
    this.mensagemErro = '';

    this.livrosService
      .devolverEmprestimo(emprestimoId)
      .pipe(
        finalize(() => {
          this.devolvendoEmprestimoId = null;
        }),
      )
      .subscribe({
        next: () => {
          window.location.reload();
        },
        error: () => {
          this.mensagemErro = 'Não foi possível devolver o empréstimo.';
        },
      });
  }

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

  getDataPrevistaPadrao(): string {
    const data = new Date();
    data.setDate(data.getDate() + 7);
    data.setMinutes(data.getMinutes() - data.getTimezoneOffset());
    return data.toISOString().slice(0, 16);
  }
}

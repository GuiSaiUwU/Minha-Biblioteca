import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Livro } from '../../entity/livro';
import { LivrosService } from '../../services/livros.service';
import { LivroForms } from './livro-forms/livro-forms';

@Component({
  selector: 'app-livros-pagina',
  imports: [
    CardModule,
    TableModule,
    InputTextModule,
    SelectModule,
    FormsModule,
    ButtonModule,
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule,
    TagModule,
    DialogModule,
    LivroForms,
  ],
  templateUrl: './livros-pagina.html',
  styleUrl: './livros-pagina.scss',
})
export class LivrosPagina implements OnInit {
  private livrosService: LivrosService = inject(LivrosService);
  mostrarFormulario = false;
  private todosLivros: Livro[] = [];
  livrosAMostra: Livro[] = [];

  categorias: string[] = [];
  categoriaSelecionada: string = '';

  statusOptions: { label: string; value: string }[] = [
    { label: 'Disponível', value: 'DISPONIVEL' },
    { label: 'Emprestado', value: 'EMPRESTADO' },
    { label: 'Todos', value: 'TODOS' },
  ];
  statusSelecionado: string = '';

  buscaTexto: string = '';

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros(): void {
    this.livrosService.getLivros().subscribe((livros) => {
      this.todosLivros = livros;
      this.livrosAMostra = livros;
      this.categorias = ['Todas'].concat(
        Array.from(new Set(livros.map((livro) => livro.categoriaNome))),
      );
    });
  }

  filtrarLivros(): void {
    let livrosFiltrados = [...this.todosLivros];

    if (this.categoriaSelecionada && this.categoriaSelecionada !== 'Todas') {
      livrosFiltrados = livrosFiltrados.filter(livro => livro.categoriaNome === this.categoriaSelecionada);
    }

    if (this.statusSelecionado && this.statusSelecionado !== 'TODOS') {
      livrosFiltrados = livrosFiltrados.filter(livro => livro.status === this.statusSelecionado);
    }

    if (this.buscaTexto && this.buscaTexto.trim() !== '') {
      const searchLower = this.buscaTexto.toLowerCase();
      livrosFiltrados = livrosFiltrados.filter(livro =>
        livro.titulo?.toLowerCase().includes(searchLower) ||
        livro.autor?.toLowerCase().includes(searchLower)
      );
    }

    this.livrosAMostra = livrosFiltrados;
  }

  limparFiltros(): void {
    this.categoriaSelecionada = '';
    this.statusSelecionado = '';
    this.buscaTexto = '';
    this.filtrarLivros();
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
  }

  fecharFormulario(): void {
    this.mostrarFormulario = false;
  }

  aoLivroCriado(): void {
    this.fecharFormulario();
    this.carregarLivros();
  }
}

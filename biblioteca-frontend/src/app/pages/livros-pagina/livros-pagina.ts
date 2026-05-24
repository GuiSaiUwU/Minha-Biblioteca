import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LivrosService } from '../../services/livros.service';
import { map, Observable } from 'rxjs';
import { Livro } from '../../entity/livro';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { AsyncPipe } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumber } from "primeng/inputnumber";
import { Tag, TagModule } from 'primeng/tag';

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
    TagModule
],
  templateUrl: './livros-pagina.html',
  styleUrl: './livros-pagina.scss',
})
export class LivrosPagina implements OnInit {
  private livrosService: LivrosService = inject(LivrosService);
  livros$: Observable<Livro[]> = this.livrosService.getLivros();
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
    this.livros$.subscribe((livros) => {
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
}

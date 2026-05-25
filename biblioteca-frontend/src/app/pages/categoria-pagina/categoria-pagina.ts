import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Categoria } from '../../entity/categoria';
import { LivrosService } from '../../services/livros.service';
import { CategoriaForms } from './categoria-forms/categoria-forms';

@Component({
  selector: 'app-categoria-pagina',
  imports: [ButtonModule, CardModule, DialogModule, TableModule, CategoriaForms],
  templateUrl: './categoria-pagina.html',
  styleUrl: './categoria-pagina.scss',
})
export class CategoriaPagina implements OnInit {
  private livrosService: LivrosService = inject(LivrosService);

  mostrarFormulario = false;
  carregando = false;
  categorias: Categoria[] = [];

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.carregando = true;

    this.livrosService.listarCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
      },
    });
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
  }

  fecharFormulario(): void {
    this.mostrarFormulario = false;
  }

  aoCategoriaCriada(): void {
    this.fecharFormulario();
    this.carregarCategorias();
  }

  excluirCategoria(categoriaId: number): void {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) {
      return;
    }
    
    this.livrosService.excluirCategoria(categoriaId).subscribe({
      next: () => {
        this.carregarCategorias();
      },
    });
  }
}

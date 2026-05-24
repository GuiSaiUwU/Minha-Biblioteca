import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Categoria } from '../../../entity/categoria';
import { CriarLivroRequest } from '../../../entity/livro';
import { LivrosService } from '../../../services/livros.service';
import { PanelModule } from 'primeng/panel';
import { InputGroupModule } from 'primeng/inputgroup';

@Component({
  selector: 'app-livro-forms',
  imports: [
    ReactiveFormsModule,
    InputGroupModule,
    InputTextModule,
    PanelModule,
    SelectModule,
    ButtonModule,
    FloatLabelModule,
  ],
  templateUrl: './livro-forms.html',
  styleUrl: './livro-forms.scss',
})
export class LivroForms implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private livrosService: LivrosService = inject(LivrosService);

  @Output() criado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();

  categorias: Categoria[] = [];
  carregandoCategorias = false;
  salvando = false;
  mensagemErro = '';

  formulario: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    autor: ['', Validators.required],
    isbn: ['', Validators.required],
    ano: [new Date().getFullYear(), [Validators.required, Validators.min(1000)]],
    categoriaId: [null, Validators.required],
  });

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.carregandoCategorias = true;
    this.livrosService.listarCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        this.carregandoCategorias = false;
      },
      error: () => {
        this.mensagemErro = 'Não foi possível carregar as categorias.';
        this.carregandoCategorias = false;
      },
    });
  }

  salvar(): void {
    if (this.formulario.invalid || this.salvando) {
      this.formulario.markAllAsTouched();
      return;
    }

    const valores = this.formulario.getRawValue();
    const requisicao: CriarLivroRequest = {
      titulo: String(valores.titulo ?? '').trim(),
      autor: String(valores.autor ?? '').trim(),
      isbn: String(valores.isbn ?? '').trim(),
      ano: Number(valores.ano),
      categoriaId: Number(valores.categoriaId),
    };

    this.salvando = true;
    this.mensagemErro = '';

    this.livrosService.criarLivro(requisicao).subscribe({
      next: () => {
        this.salvando = false;
        this.formulario.reset({ ano: new Date().getFullYear(), categoriaId: null });
        this.criado.emit();
      },
      error: () => {
        this.salvando = false;
        this.mensagemErro = 'Não foi possível criar o livro.';
      },
    });
  }

  fechar(): void {
    this.cancelado.emit();
  }
}

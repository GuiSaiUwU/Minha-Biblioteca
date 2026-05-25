import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CriarCategoriaRequest } from '../../../entity/categoria';
import { LivrosService } from '../../../services/livros.service';

@Component({
  selector: 'app-categoria-forms',
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, FloatLabelModule],
  templateUrl: './categoria-forms.html',
  styleUrl: './categoria-forms.scss',
})
export class CategoriaForms {
  private fb: FormBuilder = inject(FormBuilder);
  private livrosService: LivrosService = inject(LivrosService);

  @Output() criado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();

  salvando = false;
  mensagemErro = '';

  formulario: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    descricao: ['', Validators.required],
  });

  salvar(): void {
    if (this.formulario.invalid || this.salvando) {
      this.formulario.markAllAsTouched();
      return;
    }

    const valores = this.formulario.getRawValue();
    const requisicao: CriarCategoriaRequest = {
      nome: String(valores.nome ?? '').trim(),
      descricao: String(valores.descricao ?? '').trim(),
    };

    this.salvando = true;
    this.mensagemErro = '';

    this.livrosService.criarCategoria(requisicao).subscribe({
      next: () => {
        this.salvando = false;
        this.formulario.reset();
        this.criado.emit();
      },
      error: () => {
        this.salvando = false;
        this.mensagemErro = 'Não foi possível criar a categoria.';
      },
    });
  }

  fechar(): void {
    this.cancelado.emit();
  }
}

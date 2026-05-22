import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { LivrosService } from '../../services/livros.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-livros-dashboard',
  imports: [PanelModule, CardModule, AsyncPipe, DatePipe, DividerModule],
  templateUrl: './livros-dashboard.html',
  styleUrl: './livros-dashboard.scss',
})
export class LivrosDashboard {
  private livrosService: LivrosService = inject(LivrosService);
  livros$ = this.livrosService.getLivros();
  emprestimos$ = this.livrosService.getEmprestimos();

  constructor() {}
}

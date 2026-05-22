import { Routes } from '@angular/router';
import { LivrosDashboard } from './pages/livros-dashboard/livros-dashboard';
import { CategoriaPagina } from './pages/categoria-pagina/categoria-pagina';
import { EmprestimosPagina } from './pages/emprestimos-pagina/emprestimos-pagina';
import { LivrosPagina } from './pages/livros-pagina/livros-pagina';

export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: LivrosDashboard},
  {path: 'categorias', component: CategoriaPagina},
  {path: 'emprestimos', component: EmprestimosPagina},
  {path: 'livros', component: LivrosPagina}
];

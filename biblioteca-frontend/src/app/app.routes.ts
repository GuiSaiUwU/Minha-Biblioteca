import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', loadComponent: () => import('./pages/livros-dashboard/livros-dashboard').then(m => m.LivrosDashboard)},
  {path: 'categorias', loadComponent: () => import('./pages/categoria-pagina/categoria-pagina').then(m => m.CategoriaPagina)},
  {path: 'emprestimos', loadComponent: () => import('./pages/emprestimos-pagina/emprestimos-pagina').then(m => m.EmprestimosPagina)},
  {path: 'livros', loadComponent: () => import('./pages/livros-pagina/livros-pagina').then(m => m.LivrosPagina)}
];

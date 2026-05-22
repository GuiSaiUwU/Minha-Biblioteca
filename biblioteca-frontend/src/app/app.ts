import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LivrosDashboard } from "./pages/livros-dashboard/livros-dashboard";
import { MenuNavegacao } from "./pages/menu-navegacao/menu-navegacao";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LivrosDashboard, MenuNavegacao],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('biblioteca-frontend');
}

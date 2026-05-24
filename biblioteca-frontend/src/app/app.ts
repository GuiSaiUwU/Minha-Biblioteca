import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuNavegacao } from "./pages/menu-navegacao/menu-navegacao";
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuNavegacao, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('biblioteca-frontend');
}

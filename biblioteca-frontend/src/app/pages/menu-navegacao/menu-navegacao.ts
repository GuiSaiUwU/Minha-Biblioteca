import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-menu-navegacao',
  imports: [MenubarModule],
  templateUrl: './menu-navegacao.html',
  styleUrl: './menu-navegacao.scss',
})
export class MenuNavegacao implements OnInit {
  items: MenuItem[] = []

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: '/dashboard',
        styleClass: 'dashboard-menu-item'
      },
      {
        label: 'Livros',
        icon: 'pi pi-fw pi-book',
        routerLink: '/livros',
        styleClass: 'dashboard-menu-item'
      },
      {
        label: 'Emprestimos',
        icon: 'pi pi-fw pi-users',
        routerLink: '/emprestimos',
        styleClass: 'dashboard-menu-item'
      },
      {
        label: 'Categorias',
        icon: 'pi pi-fw pi-tags',
        routerLink: '/categorias',
        styleClass: 'dashboard-menu-item'
      }
    ]
  }
}

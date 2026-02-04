import { Component, signal } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Home} from './home/home';
import {HousingLocation} from './housing-location/housing-location';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  //Aqui hemos hecho la cabecera del programa
  template: `
    <main>
      <a [routerLink]="['/']">
        <header class="brand-name">
          <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
        </header>
      </a>          <button routerLink='/form'>Crear</button>


      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hyomes');
}

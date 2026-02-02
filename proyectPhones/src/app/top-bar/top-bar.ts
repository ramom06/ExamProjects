import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import { CartService } from '../cart.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-top-bar',
  imports: [
    RouterLink
  ],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar {
  // 1. Solo declaramos la variable y su tipo
  totalItems$: BehaviorSubject<number>;

  constructor(public cartService: CartService) {
    // 2. Asignamos el valor aquí dentro, una vez inyectado el servicio
    this.totalItems$ = this.cartService.cartCount;
  }
}

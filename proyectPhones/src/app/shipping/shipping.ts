import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../cart.service';
import {AsyncPipe, CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-shipping',
  imports: [
    AsyncPipe,
    CurrencyPipe
  ],
  templateUrl: './shipping.html',
  styleUrl: './shipping.css',
})


export class Shipping implements OnInit {

  constructor(private cartService: CartService) { }

  //Observable es una garantía de que los datos llegarán
  shippingCosts!: Observable<{ type: string, price: number }[]>;

  ngOnInit(): void {
    this.shippingCosts =  this.cartService.getShippingPrices();
  }
}

import {Component, OnInit} from '@angular/core';
import { CartService } from '../cart.service'
import {CurrencyPipe} from '@angular/common';
import {Product} from '../products';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'CartComponent ',
  imports: [
    CurrencyPipe,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})

export class Cart implements OnInit {

  checkoutForm: any;

  constructor(protected cartService: CartService, private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });
  }




  ngOnInit(): void {
    this.cartService.items = this.cartService.getItems();
    }

  onSubmit(): void {
    this.cartService.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }

}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';

import { Product, products } from '../products';
import {CurrencyPipe} from '@angular/common';
import { CartService } from '../cart.service';


@Component({
  selector: 'ProductDetails',
  imports: [
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})

// Se implemente Oninit para usar el metodo ngOnInit
export class ProductDetails implements OnInit {
    ngOnInit(): void {

      //Guarda los parametros de la ruta
      const routeParams = this.route.snapshot.paramMap;

      //Coge el id del producto de la ruta
      const productIdFromRoute = Number(routeParams.get('productId'));

      //Busca el producto con el id de la ruta
      this.product = products.find(product => product.id === productIdFromRoute)

    }

    product: Product | undefined;

    //Sirve para recoger la ruta exacta (ActivatedRoute)
    //cart inicializa el carrito, para poder añadir productos en él
    constructor(private route: ActivatedRoute, private cart : CartService) { }

  //Esto llama al metodo addToCart del objeto cart
    addToCart(product: Product) {
      this.cart.addToCart(product);
      window.alert('Your product has been added to the cart!');
    }
}

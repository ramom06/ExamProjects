import { Component } from '@angular/core';

import {products} from '../products';
import {ProductAlerts} from '../product-alerts/product-alerts';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  imports: [
    ProductAlerts,
    RouterLink
  ]
})
export class ProductList {
  products = [...products];

  share() {
    window.alert('The product has been shared!');
  }

  //Esta es lo que manda el padre cuando en el hijo (product-alert) se pulsa notify
  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}

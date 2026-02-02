import { Injectable } from '@angular/core';
import { Product } from './products';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //En este array guardamos los productos cuando inicialices el carrito
  items: Product[] = [];



  // Exponemos el emisor como un Observable para que otros lo lean


  constructor(private http: HttpClient) { }

  addToCart(product: Product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrices(){
    return this.http.get<{type:string, price:number}[]>('/assets/shipping.json')
  }
}



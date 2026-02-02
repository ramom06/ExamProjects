import { Routes } from '@angular/router';
import {ProductList} from './product-list/product-list';
import {ProductDetails} from './product-details/product-details';
import { Cart } from './cart/cart'
import {Shipping} from './shipping/shipping';
import {Providers} from './providers-details/providers';
import {ProviderList} from './provider-list/provider-list'

export const routes: Routes = [
  {path: "", component: ProductList, title: "Home Page"},
  {path: "products/:productId", component: ProductDetails, title: "Product"},
  { path: 'cart', component: Cart, title: "Cart"},
  { path: 'shipping', component: Shipping, title: "Shipping" },
  {path: 'providers-details/:id', component: Providers, title: "Providers"},
  {path: 'providers' , component: ProviderList, title: "Proveedores"},
];

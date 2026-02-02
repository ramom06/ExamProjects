import {Component, OnInit} from '@angular/core';
import {Provider, providers} from '../provider';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-providers-details',
  imports: [],
  templateUrl: './providers.html',
  styleUrl: './providers.css',
})
export class Providers implements OnInit {

  provider: Provider | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
  //Captura el id del producto en la URL
    const productID = Number(this.route.snapshot.paramMap.get('id'));

    this.provider = providers.find(p => p.products.some(
      product => product.id === productID));
  }





}

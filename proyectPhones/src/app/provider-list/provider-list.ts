import {Component, OnInit} from '@angular/core';
import {Provider, providers} from '../provider';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-provider-list',
  imports: [
    RouterLink
  ],
  templateUrl: './provider-list.html',
  styleUrl: './provider-list.css',
})
export class ProviderList implements OnInit {
  allproviders: Provider[] |undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.allproviders = [...providers]
    }
}

import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {Provider, ProviderService} from '../provider';
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
  providerService = inject(ProviderService);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
  }

  async ngOnInit(): Promise<void> {
    this.allproviders = await this.providerService.getProviders()
    this.cdr.markForCheck();
    }
}

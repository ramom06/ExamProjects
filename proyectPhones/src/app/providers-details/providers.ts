import {Component, OnInit, inject, ChangeDetectorRef} from '@angular/core';
import {Provider, ProviderService} from '../provider';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-providers-details',
  imports: [],
  templateUrl: './providers.html',
  styleUrl: './providers.css',
})
export class Providers implements OnInit {

  providerService = inject(ProviderService)
  private cdr = inject(ChangeDetectorRef);

  provider: Provider | undefined;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    const productID = Number(this.route.snapshot.paramMap.get('id'));

    try {
      const allProviders = await this.providerService.getProviders();
      this.provider = allProviders.find(p =>
        p.products.some(product => product.id === productID)
      );

      // Forzamos a Angular a revisar si hay cambios para pintar la info
      this.cdr.markForCheck();
    } catch (error) {
      console.error("Error al obtener proveedores[cite: 53]:", error);
    }
  }





}

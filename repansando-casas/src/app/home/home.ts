import {ChangeDetectorRef, Component, computed, inject, signal} from '@angular/core';
import {HousingLocation} from '../housing-location/housing-location';
import { HousingLocationInfo } from '../housing-location';
import {HousingService} from '../housing-service';

@Component({
  selector: 'app-home',
  imports: [
    HousingLocation
  ],
  //Esto crea la barra de busqueda y muestra las casas
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      @for (housingLocation of filteredLocationList(); track $index){
        <app-housing-location [housingLocation]="housingLocation"></app-housing-location>
      }
    </section>
  `,  styleUrl: './home.css',
})
export class Home {
  filterText = signal<string>('');
  housingLocationList = signal<HousingLocationInfo[]>([]);
  housingService: HousingService = inject(HousingService);
  private chageDetectorRef = inject(ChangeDetectorRef);

  filteredLocationList = computed(() => {
    const list = this.housingLocationList();
    const text = this.filterText().toLowerCase();

    if (!text) return list;

    return list.filter(location =>
      location?.city.toLowerCase().includes(text)
    );
  });

  constructor() {
    this.housingService.getAllHousingLocations().then((list: HousingLocationInfo[]) => {
      this.housingLocationList.set(list);
      this.chageDetectorRef.markForCheck()
    });
  }

  filterResults(text: string) {
    // Solo actualizamos el signal del texto y Angular hace el resto
    this.filterText.set(text);
  }
}

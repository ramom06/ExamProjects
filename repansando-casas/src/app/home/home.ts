import {ChangeDetectorRef, Component, computed, inject, signal} from '@angular/core';
import {HousingLocation} from '../housing-location/housing-location';
import { HousingLocationInfo } from '../housing-location';
import {HousingService} from '../housing-service';
import {reset} from 'yoctocolors';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    HousingLocation,
    FormsModule,
    ReactiveFormsModule
  ],
  //Esto crea la barra de busqueda y muestra las casas
  template: `
    <section>
      <form (ngSubmit)="onSubmit(filter.value, checbox.checked, orden.value)">
        <input type="text" placeholder="Filter by city" #filter>
        <input type="checkbox" #checbox><label>Solo disponibles</label>
        <select #orden>
          <option name="asc" value="asc">Ascendente</option>
          <option name="desc" value="desc">Desc</option>
        </select>
        <button class="primary" type="submit">Filtra</button>
      </form>
    </section>
    <section class="results">

      @if(filteredLocationList().length === 0){
      <p>No se encontraron viviendas que coincidan con los filtros</p>
      }

      @for (housingLocation of filteredLocationList(); track $index) {
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
  avaliable = signal<boolean>(false);

  filterOrder = signal<string>('');

  filteredLocationList = computed(() => {
    let list = this.housingLocationList();

    if(this.avaliable()){
      list = list.filter(location => location.availableUnits > 0)
    }

    if(this.filterOrder() === "desc"){
      list.sort((a, b) => b.price > a.price ? 1 : -1);
    }else if(this.filterOrder() === "asc"){
      list.sort((a, b) => a.price > b.price ? 1 : -1);
    }

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

  filtraDisponible(mode : boolean) {
    this.avaliable.set(mode);
  }

  filtraPrecio(precio: string) {
    this.filterOrder.set(precio);
  }

  onSubmit(filterValue: string, checked: boolean, ordenValue: string) {
    this.filtraDisponible(checked);
    this.filterResults(filterValue);
    this.filtraPrecio(ordenValue);
  }
}

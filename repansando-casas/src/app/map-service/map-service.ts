import {AfterViewInit, Component, Input} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-service',
  imports: [],
  template: `
    <div class="map-wrapper">
      <div id="map"></div>
    </div>
  `,
  styles: [`
    .map-wrapper {
      padding: 10px;
      background: #f8f9fa;
      border-radius: 15px;
      border: 1px solid #dee2e6;
    }
    #map {
      height: 400px;
      width: 100%;
      z-index: 1;
      display: block;
    }
  `]
})

//npm install leaflet
// npm install --save-dev @types/leaflet

export class MapService implements AfterViewInit{

  @Input() latitude!: number;
  @Input() longitude!: number;
  @Input() title: string = 'Ubicación'

  ngAfterViewInit() {
    // Usamos AfterViewInit para asegurar que el <div id="map"> ya existe
    this.initMap();
  }

  private initMap(): void {
    const map = L.map('map').setView([this.latitude, this.longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }
}

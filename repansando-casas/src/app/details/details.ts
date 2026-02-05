import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {HousingService} from '../housing-service';
import {HousingLocationInfo} from '../housing-location';
import {WeatherService} from '../weather-service/weather-service';
import {MapService} from '../map-service/map-service';
import {DetailsForm} from '../details-form/details-form';

@Component({
  selector: 'app-details',
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
    MapService,
    DetailsForm
  ],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo"
           alt="Exterior photo of {{housingLocation?.name}}"/>
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
          <li>Price: {{ housingLocation?.price | currency }}</li>
          <li>Cords: Latitude: {{ housingLocation?.coordinate?.latitude }},
            Longitude: {{ housingLocation?.coordinate?.longitude }},
          </li>
        </ul>

        <section class="weather-card">
          <h2>Tiempo en {{ weatherData.location.name }}</h2>

          <div class="weather-main">
            <img [src]="'https:' + weatherData.current.condition.icon"
                 [alt]="weatherData.current.condition.text">

            <span class="temperature">{{ weatherData.current.temp_c }}°C</span>
          </div>

          <div class="weather-details">
            <p><strong>Condición:</strong> {{ weatherData.current.condition.text }}</p>
            <p><strong>Humedad:</strong> {{ weatherData.current.humidity }}%</p>
            <p><strong>Sensación térmica:</strong> {{ weatherData.current.feelslike_c }}°C</p>
          </div>
        </section>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <app-details-form></app-details-form>
      </section>
      @if(housingLocation){
        <app-map-service [latitude]="housingLocation.coordinate.latitude"
                         [longitude]="housingLocation.coordinate.longitude"
                         [title]="housingLocation.name">
        </app-map-service>
      }
    </article>
  `,  styleUrl: './details.css',
})

export class Details{

  route: ActivatedRoute = inject(ActivatedRoute);
  weatherService = inject(WeatherService);
  private chageDetectorRef = inject(ChangeDetectorRef);
  housingService = inject(HousingService);

  housingLocation: HousingLocationInfo | undefined;
  weatherData: any;



  constructor() {
    const housingLocationId = this.route.snapshot.params['id'];

    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
      this.chageDetectorRef.markForCheck();

      if (housingLocation?.coordinate) {
        this.weatherService.getWeather(
          housingLocation.coordinate.latitude,
          housingLocation.coordinate.longitude
        ).then(weather => {
          this.weatherData = weather;
          this.chageDetectorRef.markForCheck();
        });
      }
    });
  }
}

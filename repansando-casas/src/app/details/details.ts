import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {HousingService} from '../housing-service';
import {HousingLocationInfo} from '../housing-location';
import {WeatherService} from '../weather-service/weather-service';

@Component({
  selector: 'app-details',
  imports: [
    ReactiveFormsModule,
    CurrencyPipe
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
          <li>Cords: Latitude: {{ housingLocation?.coordinate?.latitude }}, Longitude: {{ housingLocation?.coordinate?.longitude }},</li>
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
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName">

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName">

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,  styleUrl: './details.css',
})

export class Details implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  weatherService = inject(WeatherService);
  private chageDetectorRef = inject(ChangeDetectorRef);
  housingService = inject(HousingService);

  housingLocation: HousingLocationInfo | undefined;
  weatherData: any;

  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);

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

  ngOnInit(): void {
    // RECUPERAR: Al cargar la página, buscamos si hay algo guardado
    const savedData = localStorage.getItem('application-data');
    if (savedData) {
      // Usamos patchValue para rellenar el formulario con lo que recuperamos
      this.applyForm.patchValue(JSON.parse(savedData));
    }    }

  submitApplication() {
    if (this.applyForm.valid) {
      // GUARDAR: Guardamos los datos actuales en el navegador
      localStorage.setItem('application-data', JSON.stringify(this.applyForm.value));

      this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? ''
      );
    }
  }
}

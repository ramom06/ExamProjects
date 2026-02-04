import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {HousingLocationInfo} from '../housing-location';

@Component({
  selector: 'app-housing-location-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './housing-location-form.html',
  styleUrl: './housing-location-form.css',
})
export class HousingLocationForm {
  private fb = inject(NonNullableFormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  // Configuramos el formulario con los tipos de la interfaz
  form = this.fb.group({
    name: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    photo: [''],
    availableUnits: [1, [Validators.required, Validators.min(1)]],
    price: [0, [Validators.required, Validators.min(0)]],
    wifi: [false],
    laundry: [false],
    available: [true],
  });

  successMsg = '';
  errorMsg = '';
  submitting = false;

  //Cuando pulsa el boton
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;

    // Construimos el objeto final respetando la interfaz HousingLocationInfo
    // Omitimos el 'id' porque el servidor suele generarlo automáticamente
    const newHouse: Omit<HousingLocationInfo, 'id'> = {
      ...this.form.getRawValue(),
      coordinate: {
        latitude: 40.4167,
        longitude: -3.7037
      }
    };

    //Usamos post para añadir los datos
    this.http.post<HousingLocationInfo>('http://localhost:3000/locations', newHouse)
      //Esto sirve para esperar la peticion
      .subscribe({
        //Si el servidor guarda los datos correctamente
        //created es el obj que devuelve de servidor  con el id
        next: (created) => {
          this.successMsg = `Vivienda «${created.name}» creada con ID: ${created.id}`;
          this.form.reset();
          this.submitting = false;

          //Redirigimos
          this.router.navigate(['/']);
        },
        error: () => {
          this.errorMsg = 'Error al conectar con el servidor.';
          this.submitting = false;
        }
      });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}

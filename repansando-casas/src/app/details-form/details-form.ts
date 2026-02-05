import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HousingService} from '../housing-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './details-form.html',
  styleUrl: './details-form.css',
})
export class DetailsForm implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocationId = this.route.snapshot.params['id'];


  housingService = inject(HousingService);

  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    visitDate: new FormControl('', Validators.required),
    comment: new FormControl(''),
    privacity: new FormControl('', Validators.requiredTrue),
  });

  submitApplication() {
    if (this.applyForm.valid) {
      //Guardamos los datos actuales en el navegador
      localStorage.setItem('application-data', JSON.stringify(this.applyForm.value));

      this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.telefono ?? '',
        this.applyForm.value.email ?? '',
        this.applyForm.value.visitDate ?? new Date(),
        this.applyForm.value.comment ?? '',
        this.applyForm.value.privacity ?? false,
        this.housingLocationId ?? 0
      );
    }
  }

  ngOnInit(): void {
    //Al cargar la página, buscamos si hay algo guardado
    const savedData = localStorage.getItem('application-data');
    if (savedData) {
      // Usamos patchValue para rellenar el formulario con lo que recuperamos
      this.applyForm.patchValue(JSON.parse(savedData));
    }
  }
}
